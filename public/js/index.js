import { login } from './login';
import { logout } from './logout';
import { createaccount } from './createaccount';
import { updateSettings } from './updateSettings';
import { forgotpassword } from './forgotpassword';
import { resetpassword } from './resetpassword';
import { newMessage } from './messages';
import { emailReg } from './messages';
import { submitQuote } from './messages';
import { showAlert } from './alerts';

// Get Uploaded Image Size
const img = document.getElementById('hidden-image');
const ogfile = document.getElementById('original-size');
if (ogfile) {
  const width = img.width;
  const height = img.height;

  const calcWidth = (width * 0.01389) / 2;
  const calcHeight = (height * 0.01389) / 2;

  const calculatedSize =
    calcWidth.toFixed(2) + ' in. wide x ' + calcHeight.toFixed(2) + ' in. tall';

  document
    .getElementById('original-size')
    .setAttribute('value', calculatedSize);
}

// Printwear Page Filter Options
const filter = document.getElementById('filter');
const box1 = document.getElementById('brandsCol');
const box2 = document.getElementById('categoryCol');
const button = document.getElementById('resultsBtn');
const buttonDiv = document.getElementById('submitBtn');

if (filter) {
  filter.addEventListener('change', function handleChange(event) {
    buttonDiv.style.display = 'block';
    button.value = 'View All';
    if (event.target.value === 'View All') {
      button.value = 'View All';
      box1.style.display = 'none';
      box2.style.display = 'none';
    } else if (event.target.value === 'brand') {
      button.value = 'View Results By Brand';
      box1.style.display = 'block';
      box2.style.display = 'none';
    } else if (event.target.value === 'category') {
      button.value = 'View Results By Category';
      box1.style.display = 'none';
      box2.style.display = 'block';
    } else {
      box1.style.display = 'none';
      box2.style.display = 'none';
    }
  });
}

const productFilter = document.getElementById('product-filter-form');

if (productFilter) {
  productFilter.addEventListener('submit', (e) => {
    e.preventDefault();
    const filter = document.getElementById('filter').value;
    const brands = document.getElementById('brands').value;
    const category = document.getElementById('category').value;
    if (filter === 'brand' && brands === '') {
      showAlert(
        'error',
        'Please select a brand name to filter results by brand.'
      );
      window.setTimeout(() => {
        location.reload(true);
      }, 300);
    } else if (filter === 'category' && category === 'Tank Tops') {
      window.location.href = '/tanks';
    } else if (filter === 'brand') {
      window.location.href = `/filter?${filter}=${brands}#product-results`;
    } else {
      window.location.href = `/filter?${filter}=${category}#product-results`;
    }
  });
}

// Email Reg and Contact Form Message Data
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var newTime = today.getHours() + ':' + today.getMinutes();

today = mm + '/' + dd + '/' + yyyy;

const emailRegistration = document.getElementById('emailRegistration');

if (emailRegistration) {
  emailRegistration.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = today;
    const time = newTime;
    const email = document.getElementById('emailregister').value;
    console.log(date, time, email);

    emailReg(date, time, email);
  });
}

const messageForm = document.getElementById('message-form');

if (messageForm) {
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = today;
    const time = newTime;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('messagePhone').value;
    const requestType = document.getElementById('requestType').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    const contactMethod = document.getElementById('contactmethod').value;

    const name = { firstName: firstName, lastName: lastName };
    newMessage(
      date,
      time,
      name,
      email,
      phone,
      requestType,
      service,
      message,
      contactMethod
    );
  });
}

// Quote Request Form
const quoteRequest = document.getElementById('quoteForm');

if (quoteRequest) {
  quoteRequest.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = today;
    const time = newTime;
    const service = document.querySelector(
      'input[name="service"]:checked'
    ).value;
    const artFiles = document.querySelector('input[name="art"]:checked').value;
    const garments = document.querySelector(
      'input[name="garment"]:checked'
    ).value;
    const description = document.getElementById('project').value;
    const quantity = document.getElementById('quantity').value;
    const deliveryDate = document.getElementById('delivery').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const company = document.getElementById('companyname').value;
    const email = document.getElementById('quoteemail').value;
    const phone = document.getElementById('phone').value;

    submitQuote(
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
    );
  });
}

// Login
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

// Logout

const logOutBtn = document.getElementById('logout');

if (logOutBtn) logOutBtn.addEventListener('click', logout);

const logOutBtn2 = document.getElementById('logout2');

if (logOutBtn2) logOutBtn2.addEventListener('click', logout);

const logOutBtn3 = document.getElementById('logout3');

if (logOutBtn3) logOutBtn3.addEventListener('click', logout);

// Signup

const signup = document.getElementById('form-signup');

if (signup) {
  signup.addEventListener('submit', (e) => {
    e.preventDefault();
    const customerNumber = document.getElementById('customerNumber').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const tandc = document.querySelector('input[name="tandc"]:checked').value;

    if (tandc === 'Yes') {
      console.log('Cancelled signup');
      showAlert('success', 'New user account created successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      createaccount(
        customerNumber,
        firstName,
        lastName,
        company,
        email,
        password,
        passwordConfirm
      );
    }
  });
}

// Update Profile

const profileUpdateForm = document.getElementById('profile-edit');

if (profileUpdateForm) {
  profileUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street1').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const phone = document.getElementById('user-phone').value;
    const email = document.getElementById('user-email').value;
    const company = document.getElementById('user-company').value;

    const data = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      address: { street1: street, city: city, state: state, zip: zip },
      phone: phone,
      email: email,
    };

    updateSettings(data, 'Profile');
  });
}

// Update Billing

const billingUpdateForm = document.getElementById('billing-edit');

if (billingUpdateForm) {
  billingUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const street = document.getElementById('bstreet1').value;
    const city = document.getElementById('bcity').value;
    const state = document.getElementById('bstate').value;
    const zip = document.getElementById('bzip').value;

    const data = {
      billingAddress: {
        bstreet1: street,
        bcity: city,
        bstate: state,
        bzip: zip,
      },
    };

    updateSettings(data, 'Billing');
  });
}

// Update Shipping

const shippingUpdateForm = document.getElementById('shipping-edit');

if (shippingUpdateForm) {
  shippingUpdateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const street = document.getElementById('sstreet1').value;
    const city = document.getElementById('scity').value;
    const state = document.getElementById('sstate').value;
    const zip = document.getElementById('szip').value;

    const data = {
      shippingAddress: {
        sstreet1: street,
        scity: city,
        sstate: state,
        szip: zip,
      },
    };
    updateSettings(data, 'Shipping');
  });
}

// Update Password

const userPasswordForm = document.querySelector('.form-user-password');

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.savepassword').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.savepassword').textContent = 'Save New Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

// Reset Passowrd

const resetPasswordForm = document.querySelector('.form--resetpassword');

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordResetToken = document.getElementById('reset').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    resetpassword(passwordResetToken, password, passwordConfirm);
  });
}

const forgotPasswordForm = document.querySelector('.form--forgotpassword');

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotpassword(email);
  });
}

// Phone Number Formatting

const isNumericInput = (event) => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = (event) => {
  const key = event.keyCode;
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    key === 8 ||
    key === 9 ||
    key === 13 ||
    key === 46 || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

const enforceFormat = (event) => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

const formatToPhone = (event) => {
  if (isModifierKey(event)) {
    return;
  }

  const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
  const areaCode = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    event.target.value = `(${areaCode}) ${middle} - ${last}`;
  } else if (input.length > 3) {
    event.target.value = `(${areaCode}) ${middle}`;
  } else if (input.length > 0) {
    event.target.value = `(${areaCode}`;
  }
};

const inputElement = document.getElementById('phone');
const profileInputElement = document.getElementById('user-phone');
const messageInputElement = document.getElementById('messagePhone');

if (inputElement) {
  inputElement.addEventListener('keydown', enforceFormat);
  inputElement.addEventListener('keyup', formatToPhone);
}

if (profileInputElement) {
  profileInputElement.addEventListener('keydown', enforceFormat);
  profileInputElement.addEventListener('keyup', formatToPhone);
}

if (messageInputElement) {
  messageInputElement.addEventListener('keydown', enforceFormat);
  messageInputElement.addEventListener('keyup', formatToPhone);
}
