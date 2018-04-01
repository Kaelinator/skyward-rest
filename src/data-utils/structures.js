
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

  
module.exports = {
  compose,
  iPromise
}