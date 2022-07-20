const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

const usersRouter = require('./backend/routes/users.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  // 웹팩 설정
  app.use('/', middleware(compiler, {}));
}

app.use(express.static(path.resolve(__dirname, 'frontend/public/dist')));

app.use('/users', usersRouter);

app.use('/*', (req, res) => {
  res.sendFile(`${__dirname}/frontend/public/dist/index.html`)
});

module.exports = app;
