//var liteTE = require('lite-te');
function sampletemp() {
    return (`
        <div>
            <p>My Name is {{ name }}</p>
            <p &click=''>My Age is {{ age }}</p>
            <p>My Skills are</p>
            <ul>
                <li for='let skill in skills'>{{ skill }}</li>
            </ul>
        </div>
    `);
}
var context = {
    data: {
        name: 'Hello World!!',
        age: 25,
        skills: ['html', 'css', 'javascript']
    },
    methods: {
        greet: function() {
            alert(this.age);
        }
    }
};
var tpl = document.getElementById('sampleTpl').innerHTML;
var template = liteTE.compile(tpl, 'div');
var html = template.bindContext(context);