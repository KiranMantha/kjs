requirejs(['kjs'], function( kjs ) {
    var tmpl = kjs.compile(document.getElementById('template').innerHTML);
    var html = tmpl.bindContext({
        profile: {
            name: "Krasimir",
            age: 29
        },
        showSkills: true,
        skills: ['js', 'html', 'css'],
        greet: function(){ alert('hi'); }
    });
    document.getElementById('ctnr').innerHTML = html;
});

