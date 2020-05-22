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

//TODO create N number of clients and M number of requests and see how fast it can be done

const client = new protoDescriptor.ExampleProtoService('localhost:80',
    grpc.credentials.createInsecure());
client.getResponse(exampleProtobufRequest, function (err, data) {
    if (err) {
        console.log('error occured' + err);
    } else {
        console.log(data);
    }
});