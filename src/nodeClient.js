'use strict';

const http = require('http');
const url = require('url');

//for the sake of the benchmarking, we'll just use one type of fake request
const requestUrl = url.parse(url.format({
    protocol: 'http',
    hostname: 'localhost',
    pathname: '/',
    port: 80,
    query: {
        id: '123',
        code: 'fooo'
    }
}));


//TODO create N number of clients and M number of requests and see how fast it can be done
const req = http.get({
    hostname: requestUrl.hostname,
    path: requestUrl.path}, (res) => {
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});
req.on('error', (err) => {
    console.error(err);
});
req.end();