import axios from 'axios';
import { showAlert } from './alerts';

export const newMessage = async (
  date,
  time,
  name,
  email,
  phone,
  requestType,
  service,
  message,
  contactMethod
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/messages/`,
      data: {
        date,
        time,
        name,
        email,
        phone,
        requestType,
        service,
        message,
        contactMethod,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your message has been sent!');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.res.data.message);
  }
};

export const emailReg = async (date, time, email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/registration/`,
      data: {
        date,
        time,
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Thank you for registering for updates.');
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
    if (res.data.status === 'fail') {
      showAlert('error', res.data.message);
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'The email you entered is already registered to an account. Please try another email.'
    );
  }
};

export const submitQuote = async (
  date,
  time,
  service,
  description,
  quantity,
  deliveryDate,
  artFiles,
  garments,
  company,
  firstName,
  lastName,
  email,
  phone
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/quoterequest/`,
      data: {
        date,
        time,
        service,
        description,
        quantity,
        deliveryDate,
        artFiles,
        garments,
        company,
        firstName,
        lastName,
        email,
        phone,
      },
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Thank you for your quote request. Your request has been submitted!'
      );
      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert('error', err.res.data.message);
  }
};
