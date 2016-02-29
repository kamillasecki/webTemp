/// <binding AfterBuild='deploy' />
var gulp = require('gulp');
var plan = require('flightplan')
var deploy = require('ssh-deploy');
var Candyman = new require('candyman');
var candyman = new Candyman({
    targetDevices: [
        { devicename: 'galileo', hostname: '192.168.0.106' }
    ],
    projectName: 'webTemp',
    user: 'root',
    password: '',
    startfile: 'app.js'
});

gulp.task('deploy', function () {
        return candyman.deploy();

    });
});