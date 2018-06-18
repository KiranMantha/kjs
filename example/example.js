//var liteTE = require('lite-te');
function sampletemp() {
    return (`
        <div>
            <p>My Name is {{ name }}</p>
            <p click='greet'>My Age is {{ age }}</p>
            <p>My Skills are</p>
            <table>
                <tr data-for='skill in skills'>
                    <td>{{ skill.data }}</td>
                </tr>
            </table>
        </div>
    `);
}
var context = {
    data: {
        name: 'Hello World!!',
        age: 25,
        skills: [
            {data: 'html'},
            {data: 'css'},
            {data:'javascript'}
        ]
        // skills: [
        //     'html', 
        //     'css', 
        //     'javascript'
        // ]
    },
    methods: {
        greet: function() {
            alert(this.age);
        }
    }
};
// var tpl = document.getElementById('sampleTpl').innerHTML;
// var template = liteTE.compile(tpl, 'div');
// var html = template.bindContext(context);