const pipe = require ('ramda/src/pipe')
const withCss = require ('@zeit/next-css')
const withOffline = require ('next-offline')
const withTranspileModules = require ('next-transpile-modules')

const isProduction = process.env.NODE_ENV === 'production'

const config = {
  distDir: isProduction ? '../../dist/functions/next' : '../../dist/dev',
  transpileModules: ['toolbelt'],
}

module.exports = pipe (
  withOffline,
  withCss,
  withTranspileModules,
) (config)
