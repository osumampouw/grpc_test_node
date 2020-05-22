'use strict';

const superagent = require('superagent');

superagent.get('http://localhost').query({
    id: '123',
    code: 'fooo'
}).then(response => {
    console.log(response.body);
}
).catch(error => console.error(error)
);