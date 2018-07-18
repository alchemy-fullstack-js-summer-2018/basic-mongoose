/* eslint no-console: off */
const { createServer } = require('http');
require('./lib/connect.js');
const app = require('./lib/app');

const PORT = 3000;
const server = createServer(app);

server.listen(PORT, () => {
    console.log('server is running on ', server.address());
});