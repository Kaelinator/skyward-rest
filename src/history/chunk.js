module.exports = chunkFunc => (arr, yearData) => [
  ...arr,
  ...yearData.reduce((years, row) => (chunkFunc(row)
    ? [...years, [row]]
    : [...years.slice(0, -1), [...years.slice(-1)[0], row]]), []),
];
