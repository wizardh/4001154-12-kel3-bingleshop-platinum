const nodemailer = require("nodemailer");
const smtp = require("../../config/smtp");

class MailRepository {
  constructor() {}

  async sendMail(mail) {
    const transporter = nodemailer.createTransport(smtp);
    const doSend = transporter.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }

    });

    return doSend;
  }

}

module.exports = MailRepository;
