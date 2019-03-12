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

  return breakdown
    .filter(i => i !== 0) // first is the header
    .map((i, tr) => {
      const scoreText = $(tr).find('td').last().text();
      const score = extractNumber(/(\d+\.\d+)/, scoreText);

      const rest = $(tr).find('td').first();

      const litText = rest.find('div').first().text();
      const lit = /(\w*)/.exec(litText)[1];

      const gradeText = rest.find('div').first().next().text();
      const grade = extractNumber(/(\d+)/, gradeText);

      const percentText = rest.find('div').last().text();
      const percent = extractNumber(/\((\d+)%\s\w+\s\w+\s\d\s\w+\)/, percentText);

      return {
        lit,
        grade,
        score,
        percent,
      };
    }).toArray();
};

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const { course, instructor, period } = parseHeader($);
  const { lit, grade, score } = parseSummary($);
  const breakdown = parseBreakdown($);

  return {
    course,
    instructor,
    period,
    lit,
    grade,
    score,
    breakdown,
  };
};
