#!/usr/bin/env node

const prog = require('caporal');
const figlet = require('figlet')
const chalk = require('chalk');
const fs = require('fs');
const pakJSON = require('./package.json');
const homeDir = require('os').homedir();

// files 
const sendmail = require('./commands/sendmail.js')
const help = require('./commands/help.js')
const emailSetup = require('./commands/emailsetup.js');

// clearing console and writing 'sendmail'
console.clear();
console.log(
  chalk.yellow(
    figlet.textSync('Golden Falcon')
  )
);

console.log(` Send email easily from Command Line

`)
////////////////////

// Is email already setup-ed?
const isEmailSetup = () => {
    let files = fs.readdirSync(homeDir);
    for (let i=0; i<files.length; i++) {
        if (files[i] == 'config.json') {
            return true;
        } else if (i >= files.length) {
            return false;
        }
    }
}


// Program starts 
prog
.version(pakJSON.version)
.command('setup', 'Setup email address')
.action((args, option, logger) => {
    emailSetup();
})
.command('send', 'Send Email')
.action((args, option, logger) => {
    if (isEmailSetup() == true) {
        sendmail();
    } else {
        console.log(`
        ${chalk.bold.italic('Setup your Email Account')}
        `)
        emailSetup();
    }
})
prog.parse(process.argv)
