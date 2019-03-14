const $ = require('cheerio');

// const extractNumber = (regexp, text) => {
//   const result = regexp.exec(text);
//   return result ? Number(result[1]) : result;
// };

const parseHeader = ({ h }) => {
  const headerText = $(h).text();
  const headerResults = /(\d+)\D+(\d+)\D+(\d+)/.exec(headerText);

  const begin = headerResults && headerResults[1];
  const end = headerResults && headerResults[2];
  const dates = { begin, end };

  const grade = headerResults ? Number(headerResults[3]) : null;

  return { dates, grade };
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
    .map(({ tb: { r } }) => r[0].c[0])
    .map(parseHeader);
};
