'use strict';

const http = require('http');
const url = require('url');

function createResponse(request) {
    if (request.id === undefined || request.code === undefined) {
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
    new http.createServer(function (req, res) {
        let query = url.parse(req.url, true).query;
        res.write(JSON.stringify(createResponse(query)));
        res.end();
    }).listen(80);
}
