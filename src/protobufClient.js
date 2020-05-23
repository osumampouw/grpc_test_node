'use strict';

const PROTO_PATH = __dirname + '/proto/example.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

//for the sake of the benchmarking, we'll just use one type of fake request
const exampleProtobufRequest = {
    id: '123',
    code: 'fooo'
};

const retries = 10;

const client = new protoDescriptor.ExampleProtoService('localhost:80',
    grpc.credentials.createInsecure());

// method 2 if we want to benchmark using promise
let input = [];
for (let i = 0; i < retries; i++) {
    input.push(i);
}
const Bluebird = require('bluebird');

//let semaphores = retries;
console.time('protobuf');


// method 2 this is for benchmarking using promise that we can set the concurrency
Bluebird.map(input, function(inputElement) {
    return new Promise((resolve, reject) => {
        client.getResponse(exampleProtobufRequest, function (err, data) {
            if (err) {
                console.log('error occurred' + err);
                reject(err);
            } else {
                resolve();
            }
        });
    })
}, {
    concurrency: 100
}).then(() => console.timeEnd('protobuf'));

//method 1 this is for benchmarking using for loop but we cannot set the concurrency
// for (let i = 0; i < retries; i++){
//     client.getResponse(exampleProtobufRequest, function (err, data) {
//         if (err) {
//             console.log('error occurred' + err);
//         }
//         semaphores = semaphores - 1;
//         if (semaphores === 0) {
//             console.timeEnd('protobuf');
//         }
//     });
// }



