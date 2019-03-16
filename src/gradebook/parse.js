const cheerio = require('cheerio');

const extractNumber = (regexp, text) => {
  const result = regexp.exec(text);
  const n = result && Number(result[1]);
  return (n === 0) ? 0 : n || null;
};

const extractPoints = (pointsText) => {
  const earned = extractNumber(/([\d*.]+)\D+[\d*.]+/, pointsText);
  const total = extractNumber(/[\d*.]+\D+([\d*.]+)/, pointsText);
  return { earned, total };
};

const parseHeader = ($) => {
  const course = $('h2.gb_heading>span>a').first().text(); // e.g. 'PHYSICS 2 AP'
  const instructor = $('h2.gb_heading>span>a').last().text(); // e.g. 'Jay'

  const periodText = $('h2.gb_heading>span>span').text(); // e.g. '(Period #)'
  const period = extractNumber(/\(\D+(\d+)\)/, periodText);

  return { course, instructor, period };
};

const parseSummary = ($) => {
  const resultRow = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr').first();

  const gradeText = resultRow.find('td').first().text();
  const grade = extractNumber(/(\d+)/, gradeText);

  const scoreText = resultRow.find('td').last().text();
  const score = extractNumber(/(\d+\.\d+)/, scoreText);

  const gradeAdjustmentText = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr').slice(1, 2).find('td').last()
    .text();
  const gradeAdjustment = extractNumber(/(\d+\.\d+)/, gradeAdjustmentText);

  const litText = $('table[id*="grid_stuTermSummaryGrid"]>thead>tr>th').first().text();
  const litResults = /(\w+)\D+\((\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})\)/.exec(litText);
  const name = litResults && litResults[1];
  const begin = litResults && litResults[2];
  const end = litResults && litResults[3];
  const lit = { name, begin, end };

  return {
    grade, score, lit, gradeAdjustment,
  };
};

const parseBreakdown = ($) => {
  const breakdown = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr.even');

  if (breakdown.first().text() === '') return null; // no header

  const extractData = (i, tr) => {
    const scoreText = $(tr).find('td').last().text();
    const score = extractNumber(/(\d+\.\d+)/, scoreText);

    const rest = $(tr).find('td').first();

    const litText = rest.find('div').first().text();
    const lit = /(\w*)/.exec(litText)[1];

    const gradeText = rest.find('div').slice(1, 2).text();
    const grade = extractNumber(/(\d+)/, gradeText);

    const weightText = rest.find('div').last().text();
    const weight = extractNumber(/\((\d+)%\D+\d\D+\)/, weightText);

    return {
      lit,
      grade,
      score,
      weight,
    };
  };

  return breakdown
    .filter(i => i !== 0) // skip the header
    .map(extractData)
    .toArray();
};

const parseGradebook = ($) => {
  const parseSemesterCategory = (parentTr) => {
    const category = $(parentTr).text().trim();
    const breakdown = [
      $(parentTr).next(),
      $(parentTr).next().next(),
    ].map((tr) => {
      const label = $(tr).find('td').slice(1, 2);
      const lit = label.find('span').first().text();

      const datesText = label.find('span').first().attr('tooltip');
      const datesResults = /(\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})/.exec(datesText);
      const begin = datesResults ? datesResults[1] : '';
      const end = datesResults ? datesResults[2] : '';
      const dates = { begin, end };

      const weightText = label.find('span').last().text();
      const weight = extractNumber(/\(\D+(\d+\.\d+)%\)/, weightText);

      const gradeText = $(tr).find('td').slice(2, 3).text();
      const grade = extractNumber(/(\d+)/, gradeText);

      const scoreText = $(tr).find('td').slice(3, 4).text();
      const score = extractNumber(/(\d+.\d+)/, scoreText);

      const pointsText = $(tr).find('td').slice(4, 5).text();
      const points = extractPoints(pointsText);

      return {
        lit,
        weight,
        dates,
        grade,
        score,
        points,
      };
    });

    return {
      category,
      breakdown,
      assignments: [],
    };
  };

  const extractData = (_, tr) => {
    if ($(tr).find('td').length <= 1) return null;

    const isCategory = $(tr).hasClass('sf_Section cat');
    if (isCategory && $(tr).prev().hasClass('sf_Section cat')) return null;
    if (isCategory && $(tr).next().hasClass('sf_Section cat')) return parseSemesterCategory(tr);

    const gradeText = $(tr).find('td').slice(2, 3).text();
    const grade = extractNumber(/(\d+)/, gradeText);

    const scoreText = $(tr).find('td').slice(3, 4).text();
    const score = extractNumber(/(\d+.\d+)/, scoreText);

    const pointsText = $(tr).find('td').slice(4, 5).text();
    const points = extractPoints(pointsText);

    /* if it's a category */
    if (isCategory) {
      const label = $(tr).find('td').slice(1, 2);

      const category = label.clone().children().remove().end()
        .text()
        .trim();

      const weightText = label.find('span').text();
      const weight = extractNumber(/\D+([\d*.]+)%/, weightText);
      const adjustedWeight = extractNumber(/\D+[\d*.]+\D+(\d+\.\d+)%/, weightText);

      return {
        category,
        weight,
        adjustedWeight,
        grade,
        score,
        points,
        assignments: [],
      };
    }

    const date = $(tr).find('td').first().text();
    const title = $(tr).find('td').slice(1, 2).text();

    const missingText = $(tr).find('td').slice(5, 6).text();
    const noCountText = $(tr).find('td').slice(6, 7).text();
    const absentText = $(tr).find('td').slice(7, 8).text();
    const meta = [
      { type: 'missing', note: missingText },
      { type: 'noCount', note: noCountText },
      { type: 'absent', note: absentText },
    ].filter(({ note }) => !note.match(/^\s+$/));

    return {
      title,
      grade,
      score,
      points,
      date,
      meta,
    };
  };

  const nest = (gradebook, data) => {
    if (data === null) return gradebook;
    if (data.category) return gradebook.concat(data);

    const previousCategory = gradebook.slice(-1)[0];
    const assignments = previousCategory.assignments.concat(data);

    return [
      ...gradebook.slice(0, -1),
      Object.assign(previousCategory, { assignments }),
    ];
  };

  return $('table[id*="grid_stuAssignmentSummaryGrid"]>tbody>tr')
    .map(extractData)
    .toArray()
    .reduce(nest, []);
};

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const { course, instructor, period } = parseHeader($);
  const {
    lit, grade, score, gradeAdjustment,
  } = parseSummary($);
  const breakdown = parseBreakdown($);
  const gradebook = parseGradebook($);

  return {
    course,
    instructor,
    lit,
    period,
    grade,
    gradeAdjustment,
    score,
    breakdown,
    gradebook,
  };
};
