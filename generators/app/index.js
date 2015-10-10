'use strict';

var generators = require('yeoman-generator');
var changeCase = require('change-case');

module.exports = generators.Base.extend({
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);
    },

    // 询问 活动名称
    prompting: function () {
        var done = this.async();
        var defaultName = changeCase.paramCase(this.appname); // Default to current folder name
        this.prompt({
            type: 'input',
            name: 'actName',
            message: 'Your project name',
            default: defaultName
        }, function (answers) {
            var actName = answers.actName.toLowerCase() === 'y' ? defaultName : answers.actName;
            this.actName = changeCase.paramCase(actName);
            done();
        }.bind(this));
    },

    // 创建文件结构
    makeProjectDirectoryStructure: function () {
        this.template('_package.json', 'package.json');
        this.copy('jshintrc', '.jshintrc');

        this.template('conf/_config.json', 'conf/config.json');

        this.directory('server', 'server');
    },

    // npm install depedencies
    npmInstallDepedencies: function () {
        if (!this.options['skip-install']) {
            this.npmInstall([
                'express'
            ], {
                save: true
            });

            this.npmInstall([
                'browserify'
            ], {
                saveDev: true
            });
        }
    }
});
