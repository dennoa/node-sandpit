'use strict';

const cluster = require('cluster');
const os = require('os');
const doSomeWork = require('./do-some-work');

function hireWorkers() {
  const numCpus = os.cpus().length;
  console.log(`Master ${process.pid} is forking ${numCpus} workers`);
  for (let i=0; i<numCpus; i++) {
    cluster.fork();
  }
}

function start() {
  if (cluster.isMaster) {
    hireWorkers();
  } else {
    doSomeWork();
  }
}

module.exports = { start };
