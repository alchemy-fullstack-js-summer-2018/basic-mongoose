// require('dotenv').config();
const { createServer } = require('http');

const connect = require('./lib/connect');
connect('mongodb://localhost:27017/acl');
const app = require('./lib/app');

const PORT = process.env.PORT || 3000;
const server = createServer(app);

server.listen(PORT, () => {
    console.log('Server running on', server.address().port);
});