import nodemailer from "nodemailer";
import { render } from "email-templates";

//For production sesTransport({ ses })
const transporter = nodemailer.createTransport();
const FROM_EMAIL = 'GST - DEV <noreply@myilia.com>';

export const HTML_BREAK = '<br />';
const addHtmlBreak = (str: any, doubleBreak = false) => {
    if (!str) return '';

    return str.match(/\r\n/g) === null
        ? str.replace(/\n\n/g, `${HTML_BREAK}${(doubleBreak ? `${HTML_BREAK}` : '')}`)
        : str.replace(/\r\n/g, `${HTML_BREAK}${(doubleBreak ? `${HTML_BREAK}` : '')}`);
};

/**
 * sendEmail: Used to send Email
 * @param to
 * @param cc
 * @param bcc
 * @param replyTo
 * @param subject
 * @param bodyHtml
 * @param attachments
 */
const sendEmail = (to: string,
                   cc: string,
                   bcc: string,
                   replyTo: string,
                   subject: any,
                   bodyHtml: any,
                   attachments: []) => new Promise((resolve, reject) => {
    const mailOptions = { from: FROM_EMAIL, to, cc, bcc, replyTo, subject, html: bodyHtml, attachments };
    transporter.sendMail(mailOptions, (err: any, information: any) => {
        if (err) {
            console.error(err);
            return reject(err);
        }
        // console.info('envelope', information.envelope);
        console.info('messageId', information.messageId);
        console.info('Email Sent Successfully !!');
    });
});

/**
 * emailTemplate: Used to get email template
 * @param templateDir
 * @param htmlLocals
 */
const emailTemplate = (templateDir: string, htmlLocals: any) =>
    new Promise((resolve, reject) => {
        render(templateDir, htmlLocals)
            .then((html: any) => {
                resolve({ html: addHtmlBreak(html) });
            })
            .catch(reject);
});

/**
 * send: Used to call emailTemplate and sendEmail
 * @param to
 * @param cc
 * @param bcc
 * @param replyTo
 * @param subject
 * @param htmlLocals
 * @param templateDir
 * @param attachments
 */
export const send = (to: string,
                     cc: string,
                     bcc: string,
                     replyTo: string = FROM_EMAIL,
                     subject: string,
                     htmlLocals: any,
                     templateDir: string,
                     attachments: [] = []) => new Promise((resolve, reject) => {
        emailTemplate(templateDir, { htmlLocals })
            .then(({ html }: any) => sendEmail(to, cc, bcc, replyTo, subject, html, attachments))
            .then(resolve)
            .catch(err => {
                console.info('Error: Unable to send email');
                console.error(err);
                reject(err);
            });
    });
