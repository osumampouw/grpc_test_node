'use strict';

const express = require('express');
const app = express();
const port = 80;

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

app.get('/', (req, res) => {
    res.send(createResponse(req.query));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});