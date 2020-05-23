'use strict';

const superagent = require('superagent');

const retries = 50;
let semaphores = retries;

const Bluebird = require('bluebird');
let input = [];
for (let i = 0; i < retries; i++) {
    input.push(i);
}

console.time('superagent');

//method 1 if we want to benchmark using promise
Bluebird.map(input, function (inputElement) {
    return new Promise((resolve, reject) => {
        superagent.get('http://localhost').query({
            id: '123',
            code: 'fooo'
        }).then(response => {
                resolve();
            }
        ).catch(error => {
                console.error('error occured ' + error);
                reject(error);
            }
        );
    })
}, {
    concurrency: 100,
}).then(() => console.timeEnd('superagent'));

// method 2. if we want to benchmark using for loop
// for (let i = 0; i < retries; i++) {
//     superagent.get('http://localhost').query({
//         id: '123',
//         code: 'fooo'
//     }).then(response => {
//             semaphores = semaphores - 1;
//             if (semaphores === 0) {
//                 console.timeEnd('superagent');
//             }
//         }
//     ).catch(error => {
//             console.error(error);
//             semaphores = semaphores - 1;
//             if (semaphores === 0) {
//                 console.timeEnd('superagent');
//             }
//         }
//     );
// }