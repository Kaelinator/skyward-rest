
const { executeIfFunction } = require('./traversers')

/**
 * @author WaldoJeffers
 * https://gist.github.com/WaldoJeffers/905e14d03f4283599bac753f73b7716b
 */
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))


/**
 * @author Dan Levy
 * https://repl.it/@justsml/UnpackedPromise
 */
const iPromise = () => {

  let resolve, reject, promise;

  promise = new Promise((yah, nah) => { resolve = yah; reject = nah })

  return { promise, resolve, reject }
}

/**
 * @author Joel Thoms
 * https://gist.github.com/joelnet/9f0ec931e37bb3ed6d8f434ba908b715
 */
const switchcaseHelper = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase

const switchcase = cases => defaultCase => key => (...params) =>
  executeIfFunction(switchcaseHelper(cases)(defaultCase)(key), ...params)

  
module.exports = {
  compose,
  iPromise,
  switchcase
}