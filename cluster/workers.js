'use strict';

const cluster = require('cluster');
const os = require('os');
const app = require('./app');

function hireWorkers() {
  const numCpus = os.cpus().length;
  console.log(`Master ${process.pid} is forking ${numCpus} workers`);
  for (let i=0; i<numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} stopped`);
  });
}

function doSomeWork() {
  console.log(`Worker ${process.pid} started`);
  app.listen(9000);
}

function start() {
  if (cluster.isMaster) {
    hireWorkers();
  } else {
    doSomeWork();
  }
}

module.exports = { start };
