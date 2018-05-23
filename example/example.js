//var liteTE = require('lite-te');
var tpl = document.getElementById('sampleTpl').innerHTML;
var template = liteTE.compile(tpl, 'div');
var html = template.bindContext({ 
    name: 'Hello World!!' ,
    age: 25,
    skills: ['html', 'css', 'javascript']
});