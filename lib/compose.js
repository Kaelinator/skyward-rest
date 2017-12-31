
/**
 * @author WaldoJeffers
 * https://gist.github.com/WaldoJeffers/905e14d03f4283599bac753f73b7716b
 */
const compose = module.exports = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))