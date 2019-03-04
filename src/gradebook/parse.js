const cheerio = require('cheerio')

const target = /\$\.extend\(\(sff\.getValue\('sf_gridObjects'\) \|\| {}\), (.*)\)\);/g;

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const script = $('script[data-rel="sff"]').html();

  const results = target.exec(script)

  if (results.length < 2) return {};

  const finalStr = results[1].replace(/\'/g, '"')
  return JSON.parse(finalStr);
};
