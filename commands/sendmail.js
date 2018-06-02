#!/usr/bin/env node

const nodemailer = require('nodemailer')
const chalk = require('chalk')
const prompt = require('prompts');
const homeDir = require('os').homedir();
const cryptr = require('cryptr');
const crypto = new cryptr('a password');


// email config
let emailConfigOption = {
    host: null,
    port: null,
    secure: null,
    auth: {
        user: null,
        pass: null
    }
}

let questions = [
    {
        type: 'text',
        name: 'to',
        message: 'Receiver\'s Email Address'
    },
    {
        type: 'text',
        name: 'subject',
        message: 'Email Subject'
    },
    {
        type: 'text',
        name: 'text',
        message: 'Email Body'
    },
    {
        type: 'text',
        name: 'attachment',
        message: 'Path to Attachment (if Any)'
    },
    {
        type: 'text',
        name: 'emailSend',
        message: 'Type (send) to Send Email'
    },
];



module.exports = async () => {

    //Nodemailer config
    const nodemailerConfig = require(homeDir + '/config.json')

    // mailer function 
    const sendEmail = (emailData) => {

        let deCryptedPass = crypto.decrypt(nodemailerConfig.pass)

        emailConfigOption.host = nodemailerConfig.host;
        emailConfigOption.port = nodemailerConfig.port;
        emailConfigOption.secure = nodemailerConfig.secure;
        emailConfigOption.auth.user = nodemailerConfig.user;
        emailConfigOption.auth.pass = deCryptedPass;


        let transporter = nodemailer.createTransport(emailConfigOption)

        transporter.sendMail(emailData, (err, info) => {
            if (err) console.log(chalk.red(`App encountered an issue while sending file. Possible reasons are:
            1. There might be a problem with your 'config.json' file. To fix this, run 'goldenfalcon setup'
            2. You might enter receiver's email wrong.`));
            if (info != undefined) {
                console.log(`Email Sent with response ${chalk.green(info.response)} from the server.`)
            }
        })
    }
    
    
    let response = await prompt(questions)
    if (response.attachment != '') {
        response.attachments = [{filename: '', path: ''}];
        response.attachments[0].filename = response.attachment.split('/').pop();
        response.attachments[0].path = response.attachment;
    }

    if (response.emailSend == 'send') {
        console.log(chalk.yellow('Trying to send the email...'))
        sendEmail(response);
    } else {
        console.log(chalk.red('App exited with response code 1. No Email sent.'))
    }
}