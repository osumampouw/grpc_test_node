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

const retries = 10000;
// let semaphores = retries; //only used if we benchmark using for loop and not promise
const Bluebird = require('bluebird');
let input = [];
for (let i = 0; i < retries; i++) {
    input.push(i);
}

console.time('node');

// method 1. if we want to benchmark using promise
Bluebird.map(input, function (inputElement) {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: requestUrl.hostname,
            path: requestUrl.path
        }, (res) => {
            res.on('data', (d) => {
                //process.stdout.write(d);
            });
            res.on('error', (err) => {
                console.error('error occurred' + err);
                reject(err);
            });
            res.on('end', () => {
                resolve();
            });
        });
    })
}, {
    concurrency: 100,
}).then(() => console.timeEnd('node'));

//method 2. if we wanto to benchmark using for loop
// for (let i = 0; i < retries; i++) {
//     http.get({
//         hostname: requestUrl.hostname,
//         path: requestUrl.path}, (res) => {
//         res.on('data', (d) => {
//             //process.stdout.write(d);
//         });
//         res.on('error', (err) => {
//             console.error('error occurred' + err);
//             semaphores = semaphores - 1;
//             if (semaphores === 0) {
//                 console.timeEnd('node');
//             }
//         });
//         res.on('end', () => {
//             semaphores = semaphores - 1;
//             if (semaphores === 0) {
//                 console.timeEnd('node');
//             }
//         });
//     });
// }



