import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from "moment";

const fs = require("fs");
const path = require("path");
const downloadPath = path.resolve('./download');
const handlebars = require("handlebars");
const today: any = moment().format("YYYY-MM-DD_HH:mm:ss");


const mailjet = require ('node-mailjet')
.connect('04212573e56b5bc3ce53a2ea7d7c42df', '99855f2749fa31264885819364aae031')


@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

   async welcomeUser(data) {

//         const templateHtml = fs.readFileSync(path.join(process.cwd(), 'views/loan_receipt.html'), 'utf8');
// const template = handlebars.compile(templateHtml);
// const html = template({init: init, customerId: metaData['customerId'], statementRes: statementRes, user: userDetails, company: metaData['company'], now: metaData['now'],});
// const fileName = init.transRef+'_'+today2+'.pdf';
// const pathLink = path.join(process.cwd(), `download/loan/${fileName}`);

        console.log(data)

            const request = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
            "Messages":[
                {
                "From": {
                    "Email": "alala@aellacredit.com",
                    "Name": "NIBSS ONBOARDING"
                },
                "To": [
                    {
                        "Email": data.email,
                        "Name": "Nibss Admin"
                    }
                ],
                "cc": [
                    {
                        "Email": "ayoadelala@yahoo.com",
                        "Name": "Nibss Admin"
                    },
                    {
                        "Email": "dejinmisamuel@gmail.com",
                        "Name": "Nibss Admin"
                    }
                ],
                "Subject": "Greetings from NIBSS.",
                "TemplateID": 3315212,
                "TemplateLanguage": true,
                "CustomID": "AppGettingStartedTest",
                "Variables": {
                    "confirmation_link": "http://127.0.0.1:4300",
                    "email": data.email,
                    "password": data.password,
                    "firstname": data.first_name,
                    "lastname": data.last_name
                }
                }
            ]
            })
            request
            .then((result) => {
                console.log(result.body)
                return result.body;
            })
            .catch((err) => {
                console.log(err.statusCode)
                return err.statusCode;
            })

            console.log(request);
        }

        async forgotPassword(data) {

            //         const templateHtml = fs.readFileSync(path.join(process.cwd(), 'views/loan_receipt.html'), 'utf8');
            // const template = handlebars.compile(templateHtml);
            // const html = template({init: init, customerId: metaData['customerId'], statementRes: statementRes, user: userDetails, company: metaData['company'], now: metaData['now'],});
            // const fileName = init.transRef+'_'+today2+'.pdf';
            // const pathLink = path.join(process.cwd(), `download/loan/${fileName}`);
            
            console.log(data)
    
                const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                "Messages":[
                    {
                    "From": {
                        "Email": "alala@aellacredit.com",
                        "Name": "NIBSS RESET PASSWORD"
                    },
                    "To": [
                        {
                            "Email": data.email,
                            "Name": "Nibss Admin"
                        }
                    ],
                    "cc": [
                        {
                            "Email": "ayoadelala@yahoo.com",
                            "Name": "Nibss Admin"
                        },
                        {
                            "Email": "dejinmisamuel@gmail.com",
                            "Name": "Nibss Admin"
                        }
                    ],
                    "Subject": "Greetings from NIBSS.",
                    "TemplateID": 3659820,
                    "TemplateLanguage": true,
                    "CustomID": "AppGettingStartedTest",
                    "Variables": {
                        "confirmation_link": `http://127.0.0.1:4300/${data.token}`,
                        "email": data.email,
                        "token": data.token,
                        "firstname": data.first_name,
                        "lastname": data.last_name
                    }
                    }
                ]
                })
                request
                .then((result) => {
                    console.log(result.body)
                    return result.body;
                })
                .catch((err) => {
                    console.log(err.statusCode)
                    return err.statusCode;
                })
    
                console.log(request);
            }
}
