var path = require('path');
var templatesDir = path.join(__dirname, '../templates');
var emailTemplates = require('email-templates');
var config = require('../config/config');
var utils = require("../config/utils");
var postmark = require('postmark')('9ac6881c-0f13-4d7c-8a4d-70ed0b450343');

/** Mail Provider **/

Mail = function () { };

/** Send Welcome Mail **/
Mail.prototype.welcome = function (json, callback) {

    emailTemplates(templatesDir, function (err, template) {

        if (err) callback(err, null);
        else {
            template('../../views/mailTemplate/mailBenvenuto', json, function (err, html, text) {
                if (err) callback(err, null);
                else {
                    /** set mail **/
                    var mail = {
                        From: 'UniMs <servizi.unims@unims.it>',
                        To: json.email,
                        HtmlBody: html,
                        TextBody: text
                    };
                    console.log(mail);

                    /** send mail **/
                    postmark.send(mail, function (err, response) {
                        if (err) callback(err, null);
                        else callback(response, null);
                    });
                }
            });

        }
    });
};

/** Send Activate Mail **/
Mail.prototype.activate = function (json, lang, callback) {

    json.lang = lang;

    emailTemplates(templatesDir, function (err, template) {

        if (err) callback(err, null);
        else {

            template('../../views/mailTemplate/mailAttivazione', json, function (err, html, text) {

                if (err) callback(err, null);
                else {
                    /** set mail **/
                    var mail = {
                        From: 'UniMs <servizi.unims@unims.it>',
                        To: json.email,
                        HtmlBody: html,
                        TextBody: text
                    };
                    console.log(mail);

                    /** send mail **/
                    postmark.send(mail, function (err, response) {
                        if (err) callback(err, null);
                        else callback(null, response);
                    });
                }
            });

        }
    });
};

/** Resend Mail with new password **/
Mail.prototype.resend = function (json, lang, pwd, callback) {

    json.lang = lang;
    json.clean_password = pwd;

    emailTemplates(templatesDir, function (err, template) {

        if (err) callback(err, null);
        else {

            template('../../views/mailTemplate/mailResetPassword', json, function (err, html, text) {
                if (err) callback(err, null);
                else {
                    /** set mail **/
                    var mail = {
                        From: 'UniMs <servizi.unims@unims.it>',
                        To: json.email,
                        HtmlBody: html,
                        TextBody: text
                    };
                    console.log(mail);

                    /** send mail **/
                    postmark.send(mail, function (err, response) {
                        if (err) callback(err, null);
                        else callback(response, null);
                    });
                }
            });

        }
    });
};

exports.Mail = Mail;