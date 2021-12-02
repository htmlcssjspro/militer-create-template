#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/* eslint-disable no-console */

const root = process.cwd();
// const nodeDir = process.argv[0];
// const execFile = process.argv[1];
// const projectName = process.argv[2] || 'new-militer-template';
// const projectPath = path.join(root, projectName);
const remoteRepoUrl = 'https://github.com/htmlcssjspro/militer-template.git';


const temp = fs.mkdtempSync(path.join(root, path.sep));

console.log('Installing new militer-template ...');
console.log('Downloading files ...');
execSync(`git clone --depth 1 ${remoteRepoUrl} ${temp}`);

fs.cpSync(temp, root, {recursive: true});
fs.rmSync(temp, {recursive: true, force: true});
rename('gulp/ftpConfig.js.example', 'gulp/ftpConfig.js', 'Add gulp/ftpConfig.js');
rename('www/config/dbconfig.php.example', 'www/config/dbconfig.php', 'Add www/config/dbconfig.php');


console.log('npm init ...');
execSync('npm init -y');
console.log('npm check updates ...');
execSync('ncu -u');


console.log('Installing dependencies...');
execSync('npm install');


console.log('Template is ready to use!');


function rename(oldPath, newPath, message) {
    fs.renameSync(oldPath, newPath, error => {
        error && console.error(error);
        console.log(message);
    });
}
