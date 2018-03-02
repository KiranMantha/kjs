var kjs = require('./kjs');
var template = kjs.compile('<p>{{ this.name }}</p>');
var html = template.bindContext({ name: 'Hello World!!' });
document.querySelector('body').innerHTML = html;