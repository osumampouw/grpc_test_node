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
const exampleProtoService = protoDescriptor.ExampleProtoService;

function getResponse(call, callback) {
    callback(null, createResponse(call.request))
}

function createResponse(exampleProtobufRequest) {
    if (exampleProtobufRequest.id === undefined || exampleProtobufRequest.code === undefined) {
        return {
            status: '500',
            result: undefined,
            errorMessage: 'you send a request where the id or code is undefined'
        }
    } else {
        if (Math.random() < 0.500) {
            return {
                status: '200',
                result: 'type 1 result'
            }
        } else {
            return {
                status: '200',
                result: 'type 2 result'
            }
        }
    }
}


if (require.main === module) {
    const server = new grpc.Server();
    server.addService(exampleProtoService.service, {
        getResponse: getResponse
    });

    server.bind('0.0.0.0:80', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log(server);
}

