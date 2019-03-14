const $ = require('cheerio');

const parseHeader = ({ c: [{ h }] }) => {
  const headerText = $(h).text();
  const headerResults = /(\d+)\D+(\d+)\D+(\d+)/.exec(headerText);

  const begin = headerResults && headerResults[1];
  const end = headerResults && headerResults[2];
  const dates = { begin, end };

  const grade = headerResults ? Number(headerResults[3]) : null;

  return { dates, grade, courses: [] };
};

const parseLits = ({ c }) => c.slice(2)
  .map(({ h }) => $(h).text())
  .map(lit => ({ lit }));

const parseCourses = ({ c }) => {
  const course = $(c[0].h).text();
  const scores = c.slice(2)
    .map(({ h }) => $(h).text().trim())
    .map(text => ({ grade: Number(text) || text || null }));
  return { course, scores };
};

const merge = (obj, row) => {
  if (row.courses) return row; // set base object
  if (row.scores) return { ...obj, courses: obj.courses.concat(row) }; // append score

  /* place 'lit' information into every score */
  const courses = obj.courses
    .map(({ scores, ...rest }) => ({
      ...rest,
      scores: scores
        .map(({ grade }, i) => ({ grade, ...row[i] }))
        .filter(({ grade }) => !!grade), // get rid of null elements
    }));

  return { ...obj, courses };
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
