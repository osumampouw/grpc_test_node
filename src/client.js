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
console.log(protoDescriptor.ExampleProtoService);
const client = new protoDescriptor.ExampleProtoService('localhost:80',
    grpc.credentials.createInsecure());
console.log(client);
const exampleProtobufRequest = {
    id: '123',
    code: 'fooo'
};
client.getResponse(exampleProtobufRequest, function (err, data) {
    if (err) {
        console.log('error occured' + err);
    } else {
        console.log(data);
    }
})