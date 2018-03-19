//var liteTE = require('lite-te');
var template = liteTE.compile('<p>{{ this.name }}</p>');
var html = template.bindContext({ name: 'Hello World!!' });
document.querySelector('div').innerHTML = html;
setTimeout(function(){
    var html = template.bindContext({ name: 'Hello World after 5sec!!' });
    document.querySelector('div').innerHTML = html;
}, 5000);