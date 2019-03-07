const keyMatch = /stuGradesGrid_\d{5}_\d{3}/;

module.exports = (data) => {
  const values = Object.entries(data);
  const targetPair = values.find(([key]) => keyMatch.test(key));

  if (targetPair === undefined) throw new Error('stuGradesGrid not found');

  const targetData = targetPair[1];
  if (targetData.tb === undefined) throw new Error('stuGradesGrid.tb not found');

  const { r } = targetData.tb;
  if (r === undefined) return [];

  return r;
};
