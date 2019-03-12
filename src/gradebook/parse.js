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
  const resultRow = $('table[id*="grid_stuTermSummaryGrid"]>tbody>tr');

  const gradeText = $(resultRow.first().html(), 'tr').first().text();
  const grade = extractNumber(/(\d+)/, gradeText);

  const scoreText = $(resultRow.first().html(), 'tr').last().text();
  const score = extractNumber(/(\d+\.\d+)/, scoreText);

  const litText = $('table[id*="grid_stuTermSummaryGrid"]>thead>tr>th').first().text();
  const litResults = /(\w+)\s\w+\((\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}\/\d{2}\/\d{4})\)/.exec(litText);
  const name = litResults ? litResults[1] : '';
  const begin = litResults ? litResults[2] : '';
  const end = litResults ? litResults[3] : '';

  return { grade, score, lit: { name, begin, end } };
};

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const { course, instructor, period } = parseHeader($);
  const { lit, grade, score } = parseSummary($);

  return {
    course,
    instructor,
    period,
    lit,
    grade,
    score,
  };
};
