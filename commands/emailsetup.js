'use strict';

const prompt = require('prompts');
const fs = require('fs');
const chalk = require('chalk');
const cryptr = require('cryptr');
const crypto = new cryptr('a password');
const homeDir = require('os').homedir();


module.exports = async function(){
    const questions = [
        {
            type: 'text',
            name: 'host',
            message: `Your SMTP Host URL`
        },
        {
            type: 'number',
            name: 'port',
            message: `Your SMTP PORT`,
            initial: '587'
        },
        {
            type: prev => prev && 'toggle',
            name: 'secure',
            message: `Is the PORT Secure?`,
            active: 'true',
            inactive: 'false'
        },
        {
            type: 'text',
            name: 'user',
            message: `Your Email Address`,
        },
        {
            type: 'password',
            name: 'pass',
            message: `Password`,
        }
    ];

    let answers = await prompt(questions);

    // cryptr
    let cryptedPass = crypto.encrypt(answers.pass);
    answers.pass = cryptedPass;
    answers = JSON.stringify(answers);
    // Writing to file
    // TODO: FIX blank form submission
    if (typeof answers.host === undefined || answers.host == '') {
        console.log(chalk.bold.white.bgRed('Enter All The Information Correctly'))
        return;
    } else if (typeof answers.port === undefined || answers.port == '') {
        console.log(chalk.bold.white.bgRed('Enter All The Information Correctly'))
        return;
    } else if (typeof answers.secure === undefined || answers.secure == '') {
        console.log(chalk.bold.white.bgRed('Enter All The Information Correctly'))
        return;
    } else if (typeof answers.user === undefined || answers.user == '') {
        console.log(chalk.bold.white.bgRed('Enter All The Information Correctly'))
        return;
    } else if (typeof answers.pass === undefined || answers.pass == '') {
        console.log(chalk.bold.white.bgRed('Enter All The Information Correctly'))
        return;
    } else {
        fs.writeFile(homeDir + '/config.json', answers, 'utf8', (err) => {
            if (err) throw err;
        })
    }
};