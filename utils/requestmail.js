const nodemailer = require('nodemailer');
const pug = require('pug');
const Transport = require('nodemailer-brevo-transport');

module.exports = class Registration {
  constructor(request) {
    this.to = request.email;
    this.from = `Audrey Design & Print Studio<${process.env.EMAIL_ADMIN}>`;
    this.date = request.date;
    this.time = request.time;
    this.service = request.service;
    this.description = request.description;
    this.quantity = request.quantity;
    this.deliveryDate = request.deliveryDate;
    this.artFiles = request.artFiles;
    this.garments = request.garments;
    this.name = request.firstName + ' ' + request.lastName;
    this.phone = request.phone;
    this.email = request.email;
    this.company = request.company;
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
      date: this.date,
      time: this.time,
      service: this.service,
      description: this.description,
      quantity: this.quantity,
      deliveryDate: this.deliveryDate,
      artFiles: this.artFiles,
      garments: this.garments,
      name: this.name,
      phone: this.phone,
      company: this.company,
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

  async sendRequest() {
    await this.send(
      'request',
      'Thank you for your quote request from Audrey Design & Print Studio'
    );
  }
};
