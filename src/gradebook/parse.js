const cheerio = require('cheerio');

const extractNumber = (regexp, text) => {
  const result = regexp.exec(text);
  return (result === null) ? -1 : Number(result[1]);
};

const parseHeader = ($) => {
  const course = $('h2.gb_heading>span>a').first().text(); // e.g. 'PHYSICS 2 AP'
  const instructor = $('h2.gb_heading>span>a').last().text(); // e.g. 'Jay'

  const periodText = $('h2.gb_heading>span>span').text(); // e.g. '(Period #)'
  const period = extractNumber(/\(\w+\s(\d+)\)/, periodText);

  return { course, instructor, period };
};

const parseSummary = ($) => {
  const resultRow = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr').first();

  const gradeText = resultRow.find('td').first().text();
  const grade = extractNumber(/(\d+)/, gradeText);

  const scoreText = resultRow.find('td').last().text();
  const score = extractNumber(/(\d+\.\d+)/, scoreText);

  const litText = $('table[id*="grid_stuTermSummaryGrid"]>thead>tr>th').first().text();
  const litResults = /(\w+)\s\w+\((\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})\)/.exec(litText);
  const name = litResults ? litResults[1] : '';
  const begin = litResults ? litResults[2] : '';
  const end = litResults ? litResults[3] : '';

  return { grade, score, lit: { name, begin, end } };
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
    const weight = extractNumber(/\((\d+)%\s\w+\s\w+\s\d\s\w+\)/, weightText);

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
  const extractData = (i, tr) => {
    const gradeText = $(tr).find('td').slice(2, 3).text();
    const grade = extractNumber(/(\d+)/, gradeText);

    const scoreText = $(tr).find('td').slice(3, 4).text();
    const score = extractNumber(/(\d+.\d+)/, scoreText);

    const earnedText = $(tr).find('td').slice(4, 5).text();
    const earnedResults = /(\d+|\*)\s\w+\s\w+\s(\d+|\*)/.exec(earnedText);
    const earned = {
      points: earnedResults ? Number(earnedResults[1]) : null,
      total: earnedResults ? Number(earnedResults[2]) : null,
    };

    /* if it's a category */
    if ($(tr).hasClass('sf_Section cat')) {
      const label = $(tr).find('td').slice(1, 2);

      const category = label.clone().children().remove().end()
        .text()
        .trim();

      const weightText = label.find('span').text();
      const weight = extractNumber(/\w+\s\w+\s(\d+.\d+)%/, weightText);
      return {
        category,
        weight,
        grade,
        score,
        earned,
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
      earned,
      date,
      meta,
    };
  };

  const nest = (gradebook, data) => {
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
  const { lit, grade, score } = parseSummary($);
  const breakdown = parseBreakdown($);
  const gradebook = parseGradebook($);

  return {
    course,
    instructor,
    lit,
    period,
    grade,
    score,
    breakdown,
    gradebook,
  };
};
