#!/usr/bin/env node

const chalk = require('chalk');

let help = {
    noFlag: () => {
        console.log(`
        ${chalk.white.bold('USAGE')}
        
        $ ${chalk.green('goldenfalcon ')} ${chalk.yellow('[option]')}


        ${chalk.white.bold('OPTIONS')}

        -S              Setup your Email account to start sending mails
        -M              To send a mail to any Email address


        ${chalk.white.bold('OTHER OPTIONS')}

        --gmail-help     Run this option to get to know how to setup a Gmail
        --yahoo-help     Run this option to get to know how to setup a Yahoo!


        ${chalk.white.bold('EXAMPLE')}

        $ ${chalk.green('goldenfalcon ')} ${chalk.yellow('-S | -M')}
        `)
    }
}

module.exports = help;