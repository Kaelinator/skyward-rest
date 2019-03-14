const $ = require('cheerio');

const extractNumber = (regexp, text) => {
  const result = regexp.exec(text);
  return result ? Number(result[1]) || result[1] : result;
};

const parseHeader = ({ c: [{ h }] }) => {
  const headerText = $(h).text();
  const headerResults = /(\d+)\D+(\d+)\D+(\d+)/.exec(headerText);

  const begin = headerResults && headerResults[1];
  const end = headerResults && headerResults[2];
  const dates = { begin, end };

  const grade = headerResults ? Number(headerResults[3]) : null;

  return { dates, grade, courses: [] };
};

const parseLits = ({ c }) => c.slice(2, -1)
  .map(({ h }) => $(h).text())
  .map(lit => ({ lit }));

const parseCourses = ({ c }) => {
  const course = $(c[0].h).text();
  const scores = c.slice(2, -1).map(({ h }) => ({ grade: extractNumber(/(.*)/, $(h).text()) }));
  return { course, scores };
};

const merge = (obj, rowData) => {
  if (rowData.courses) return rowData; // set base object
  if (rowData.scores) return Object.assign(obj, { courses: obj.courses.concat(rowData) }); // append score

  const courses = obj.courses
    .map(({ scores, ...rest }) => ({
      ...rest,
      scores: scores.map(({ grade }, i) => ({ grade, ...rowData[i] })),
    }));

  return Object.assign(obj, { courses });
};

module.exports = (data) => {
  const values = Object.entries(data);
  const targetPairs = values.filter(([key]) => /gradeGrid_\d{5}_\d{3}_\d{4}/.test(key));

  // if (targetPairs.length === 0) throw new Error('gradeGrid not found');

  // const targetData = targetPairs[1];
  // if (targetData.tb === undefined) throw new Error('gradeGrid.tb not found');

  // const { r } = targetData.tb;
  // if (r === undefined) return [];

  return targetPairs
    .map(pair => pair[1])
    .map(({ tb: { r } }) => r)
    .map(([header, lits, ...courses]) => [
      parseHeader(header),
      ...courses.map(parseCourses),
      parseLits(lits),
    ].reduce(merge));
};
