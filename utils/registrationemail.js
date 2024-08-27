const nodemailer = require('nodemailer');
const pug = require('pug');
const Transport = require('nodemailer-brevo-transport');

module.exports = class Registration {
  constructor(registered) {
    this.date = registered.date;
    this.time = registered.time;
    this.to = registered.email;
    this.from = `Audrey Design & Print Studio<${process.env.EMAIL_ADMIN}>`;
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
      email: this.to,
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

  async sendRegistration() {
    await this.send(
      'registration',
      'You have registered for updates from Audrey Design & Print Studio'
    );
  }
};
