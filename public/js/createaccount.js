import axios from 'axios';
import { showAlert } from './alerts';

export const createaccount = async (
  customerNumber,
  firstName,
  lastName,
  company,
  email,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/`,
      data: {
        customerNumber,
        firstName,
        lastName,
        company,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'New user account created successfully');
      window.setTimeout(() => {
        location.assign('/account');
      }, 1500);
    }
  } catch (err) {
    showAlert(
      'error',
      'The email you entered is already registered to an account. Please try another email.'
    );
  }
};
