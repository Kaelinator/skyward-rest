const $ = require('cheerio');

const keyMatch = /stuGradesGrid_\d{5}_\d{3}/;
const isClassHeader = ({ c }) => c !== undefined && c.length > 0 && c[0].cId !== undefined;

const isScoreElement = ({ h }) => h !== undefined && $(h).find('a').length;
const getData = ({ h }) => {
  const element = $(h).find('a')[0];

  return ({
    course: Number($(element).attr('data-cni')),
    bucket: $(element).attr('data-bkt'),
    score: Number($(element).text()),
  });
};

const merge = (parent, child) => ({
  course: parent.course || child.course,
  scores: parent.scores.concat({ bucket: child.bucket, score: child.score }),
});

module.exports = (data) => {
  const values = Object.entries(data);
  const targetPair = values.find(([key]) => keyMatch.test(key));

  if (targetPair === undefined) throw new Error('stuGradesGrid not found');

  const targetData = targetPair[1];
  if (targetData.tb === undefined) throw new Error('stuGradesGrid.tb not found');

  const { r } = targetData.tb;
  if (r === undefined) return [];

  return targetData.tb.r
    .filter(isClassHeader)
    .map(({ c }) => c.filter(isScoreElement)
      .map(getData)
      .reduce(merge, { scores: [] }));
};
