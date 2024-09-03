const nodemailer = require('nodemailer');
const pug = require('pug');
const Transport = require('nodemailer-brevo-transport');

module.exports = class Message {
  constructor(message) {
    this.from = message.email;
    this.firstName = message.name.firstName;
    this.lastName = message.name.lastName;
    this.phone = message.phone;
    this.date = message.date;
    this.time = message.time;
    this.service = message.service;
    this.requestType = message.requestType;
    this.message = message.message;
    this.contact = message.contactMethod;
    this.to = `Audrey Design & Print Studio<${process.env.EMAIL_ADMIN}>`;
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
      lastName: this.lastName,
      phone: this.phone,
      date: this.date,
      time: this.time,
      email: this.from,
      contact: this.contact,
      service: this.service,
      requestType: this.requestType,
      message: this.message,
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

  async sendMessage() {
    await this.send(
      'message',
      'You have received a new message from ' +
        this.firstName +
        ' ' +
        this.lastName
    );
  }
};
