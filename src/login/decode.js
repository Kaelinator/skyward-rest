module.exports = ({ data } = {}) => {
  if (!data) throw new TypeError('data is required');

  if (data === '<li>Invalid login or password.</li>') throw new Error('Invalid Skyward credentials');

  const tokens = data.slice(4, -5)
    .split('^');

  if (tokens.length < 15) throw new Error('Malformed auth data');

  return { dwd: tokens[0], wfaacl: tokens[3], encses: tokens[14] };
};
