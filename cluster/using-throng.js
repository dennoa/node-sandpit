'use strict';

const throng = require('throng');
const doSomeWork = require('./do-some-work');

throng(doSomeWork);
