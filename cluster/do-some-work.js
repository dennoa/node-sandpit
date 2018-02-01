'use strict';

const app = require('./app');

module.exports = () => {
  console.log(`Worker ${process.pid} started`);
  process.on('exit', () => {
    console.log(`Worker ${process.pid} stopped`);
  });
  app.listen(9000);
};
