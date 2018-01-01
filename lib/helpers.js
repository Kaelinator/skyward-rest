
/**
 * @author WaldoJeffers
 * https://gist.github.com/WaldoJeffers/905e14d03f4283599bac753f73b7716b
 */
module.exports.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))


/**
 * @author Dan Levy
 * https://repl.it/@justsml/UnpackedPromise
 */
module.exports.iPromise = () => {

  let resolve, reject, promise;

  promise = new Promise((yah, nah) => { resolve = yah; reject = nah })

  return { promise, resolve, reject }
}

/**
 * @author Rotareti
 * https://stackoverflow.com/a/38829074/5563110
 */
module.exports.mapObj = (obj, f) => Object.assign(
  ...Object.entries(obj).map(([ k, v ]) => ({ [k]: f(v) }))
)
