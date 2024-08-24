const nodemailer = require('nodemailer');
const pug = require('pug');
const Transport = require('nodemailer-brevo-transport');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.firstName;
    this.token = url.split('resetPassword/')[1];
    this.tokenUrl = url.split('api/')[0];
    this.from = `Audrey Design and Print Studio<${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport(
        new Transport({ apiKey: process.env.BREVO_APIKEY })
      );
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      tokenUrl: this.tokenUrl,
      token: this.token,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome ' + this.firstName + '!');
  }

  async sendOrderConfirm() {
    await this.send('orderconfirm', 'Thank You for your Order!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token. Valid for only 10 minutes'
    );
  }
};
