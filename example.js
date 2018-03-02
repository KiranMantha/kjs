var liteTE = require('./index.js');
var template = liteTE.compile('<p>{{ this.name }}</p>');
var html = template.bindContext({ name: 'Hello World!!' });
document.querySelector('body').innerHTML = html;