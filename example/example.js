//var liteTE = require('lite-te');
var context = new lcContext({
    template: `
        <div>
            <p>My Name is {{ name }}</p>
            <p lc-click='greet'>My Age is {{ age }}</p>
            <p>My Skills are</p>
            <table>
                <tr data-for='skill in skills'>
                    <td lc-click='showSkill(skill.data)'>{{ skill.data }}</td>
                </tr>
            </table>
        </div>
    `,
    controller: function() {
        this.name = 'Hello World!!';
        this.age = 25;
        this.skills = [
            { data: 'html' },
            { data: 'css' },
            { data: 'javascript' }
        ];
        this.greet = function () {
            alert(this.age);
        };
        this.showSkill = function (skill) {
            alert(skill);
            this.greet();
        }
    }
});