var liteTE = require('lite-te');
var template = liteTE.compile('<p>{{ this.name }}</p>');
var html = template.bindContext({ name: 'Hello World!!' });
document.querySelector('body').innerHTML = html;