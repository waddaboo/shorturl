const http = require('http');
const app = require('./app');

const server = http.createServer(app.default);

const nodeEnv = process.env.NODE_ENV || 'undefined';
const port = process.env.SERVER_PORT || 8080;

server.listen(port, () => {
  console.log(`🚀 ${nodeEnv.toUpperCase()} @ PORT ${port}`);
});

module.exports = server;
