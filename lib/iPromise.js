
/**
 * @author Dan Levy
 * https://repl.it/@justsml/UnpackedPromise
 */
const uPromised = module.exports = () => {

  let resolve, reject, promise;

  promise = new Promise((yah, nah) => { resolve = yah; reject = nah })

  return { promise, resolve, reject }
}