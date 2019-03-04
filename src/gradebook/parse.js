const cheerio = require('cheerio');

module.exports = ({ data }) => {
  const $ = cheerio.load(data);

  const script = $('script[data-rel="sff"]').html();

  const results = /\$\.extend\(\(sff\.getValue\('sf_gridObjects'\) \|\| {}\), ([\s\S]*)\)\);/g.exec(script);

  return (results === null) ? {} : eval(`0 || ${results[1]}`);
};
