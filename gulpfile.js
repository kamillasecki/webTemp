/// <binding AfterBuild='deploy' />
var gulp = require('gulp');
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
//return candyman.deploy();
    deploy.publish('root@192.168.0.106', { directory: process.cwd }).then(function () {
        return deploy.start('root@192.168.0.106', { directory: process.cwd });
    }).done(function () {
        console.log('updated deployment');
    });
});