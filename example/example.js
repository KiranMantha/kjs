//var liteTE = require('lite-te');
var tpl = document.getElementById('sampleTpl').innerHTML;
var template = liteTE.compile(tpl);
var html = template.bindContext({ 
    name: 'Hello World!!' ,
    age: 25,
    skills: ['html', 'css', 'javascript']
});
document.querySelector('div').innerHTML = html;