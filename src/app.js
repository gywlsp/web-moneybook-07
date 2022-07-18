var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)

var indexRouter = require('./backend/routes/index')
var usersRouter = require('./backend/routes/users')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'development') {
  // 웹팩 설정
  app.use('/', middleware(compiler, {}))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend/public/dist')))
}

app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app
