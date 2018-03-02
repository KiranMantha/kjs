Lite-TE is a simple light weight template engine.

#Usage

1. install lite-te using npm `npm install lite-te --save`
2. import lite-te as `var liteTE = require('lite-te');`
3. pass your html to compile function of liteTE as `var template = liteTE.compile(your-html-string);`
4. the `template` variable now consists of `bindContext` function which binds your javascript object to the html. `var html = temlate.bindContext(your-object);`

#Example

    var liteTE = require('lite-te');
    var tempalte = liteTE.compile('<p>{{ this.profile.name }}</p><p>{{ this.profile.age }}</p>');
    var html = template.bindContext({ 
        profile: {
            name: 'Hello World',
            age: '100 years'
        }
    });
    documsnt.querySelector('body').innerHTML = html;
