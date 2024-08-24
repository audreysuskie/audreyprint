import { login } from './login';
import { logout } from './logout';
import { createaccount } from './createaccount';
import { updateSettings } from './updateSettings';
import { forgotpassword } from './forgotpassword';
import { resetpassword } from './resetpassword';
import { newOrder } from './order';
import { newTransferOrder } from './order';
import { updateOrder } from './order';
import { updateTransferOrder } from './order';
import { newMessage } from './messages';
import { showAlert } from './alerts';

const filter = document.getElementById('filter');
const box1 = document.getElementById('brandsCol');
const box2 = document.getElementById('categoryCol');
const button = document.getElementById('resultsBtn');
const buttonDiv = document.getElementById('submitBtn');

// Set Dashboard Nav Items to Active While on Current Page
const dashboard = document.getElementById('account');
if (dashboard) {
  const url = location.pathname.split('/')[1];
  if ($(`#${url}`).attr('href') == '/' + url) {
    $(`#${url}`).addClass('active');
  }
}

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

const productForm = document.getElementById('product-select-form');

if (productForm) {
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filter = document.getElementById('filter').value;
    const brands = document.getElementById('brands').value;
    const category = document.getElementById('category').value;

    if (filter === 'brand') {
      window.location.href = `/allproducts?${filter}=${brands}`;
    } else {
      window.location.href = `/allproducts?${filter}=${category}`;
    }
  });
}

// const imagePreview = document.getElementById('preview');
// const buttonWrapper = document.getElementById('buttonWrapper');
// const singleFileElement = document.getElementById('orderFile');

// function showPreview() {
//   const files = singleFileElement.files;
//   if (!files || files.length === 0) {
//     buttonWrapper.style.display = 'none';
//     imagePreview.style.display = 'none';
//     return;
//   }

//   const pickedFile = files[0];
//   imagePreview.style.display = 'block';
//   imagePreview.src = URL.createObjectURL(pickedFile);
//   buttonWrapper.style.display = 'flex';
// }

// singleFileElement.addEventListener('change', showPreview);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var newTime = today.getHours() + ':' + today.getMinutes();

today = mm + '/' + dd + '/' + yyyy;

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
    const contactMethod = document.querySelector(
      'input[name="contactmethod"]:checked'
    ).value;

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

const transferOrderForm = document.getElementById('transfer-order-form');

if (transferOrderForm) {
  transferOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const inputFile = document.getElementById('orderFiles');
    const orderNumber = Math.floor(Math.random() * 20000) + 10000;
    form.append('orderNumber', orderNumber);
    form.append('orderDate', today);
    for (const file of inputFile.files) {
      form.append('orderFiles', file);
    }
    newTransferOrder(form, 'data');
  });
}

const fileSelectForm = document.getElementById('file-select-form');

if (fileSelectForm) {
  fileSelectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    const inputFile = document.getElementById('orderFiles');
    const orderNumber = Math.floor(Math.random() * 20000) + 10000;
    form.append('orderNumber', orderNumber);
    form.append('orderDate', today);
    for (const file of inputFile.files) {
      form.append('orderFiles', file);
    }

    newOrder(form, 'data');
  });
}

const printOrderUpdate = document.getElementById('print-order-update');

if (printOrderUpdate) {
  printOrderUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const options = document.getElementById('options-length').value;
    const dateReq = document.getElementById('dateReq').value;
    const mod = document.getElementById('mod').value;
    const orderID = document.getElementById('orderID').value;
    const customerID = document.getElementById('customerID').value;
    const firstName = document.getElementById('orderFirstName').value;
    const lastName = document.getElementById('orderLastName').value;
    const company = document.getElementById('orderCompany').value;
    const email = document.getElementById('orderEmail').value;
    const phone = document.getElementById('orderPhone').value;

    customerName = firstName + ' ' + lastName;

    const customerInfo = {
      customerName: customerName,
      company: company,
      email: email,
      phone: phone,
    };

    const orderInfo = [];
    for (let i = 1; i <= options; i++) {
      const height = document.getElementById(`height${i}`).value;
      const width = document.getElementById(`width${i}`).value;
      const fileID = document.getElementById(`fileID${i}`).value;
      const placement = document.getElementById(`placement${i}`).value;
      const placementOther = document.getElementById(
        `placementOther${i}`
      ).value;
      const type = document.getElementById(`garmentType${i}`).value;
      const brand = document.getElementById(`garmentBrand${i}`).value;
      const item = document.getElementById(`ItemNumber${i}`).value;
      const color = document.getElementById(`ItemColor${i}`).value;
      const sizeXSqty = document.getElementById(`sizeXSqty${i}`).value;
      const sizeSqty = document.getElementById(`sizeSqty${i}`).value;
      const sizeMqty = document.getElementById(`sizeMqty${i}`).value;
      const sizeLqty = document.getElementById(`sizeLqty${i}`).value;
      const sizeXLqty = document.getElementById(`sizeXLqty${i}`).value;
      const size2XLqty = document.getElementById(`size2XLqty${i}`).value;
      const size3XLqty = document.getElementById(`size3XLqty${i}`).value;
      dimensions = width + '" wide x ' + height + '" tall';
      totalQuantity =
        Number(sizeXSqty) +
        Number(sizeSqty) +
        Number(sizeMqty) +
        Number(sizeLqty) +
        Number(sizeXLqty) +
        Number(size2XLqty) +
        Number(size3XLqty);

      const orderLI = {
        dimensions: dimensions,
        fileID: fileID,
        placement: placement,
        placementOther: placementOther,
        garmentType: type,
        garmentBrand: brand,
        garmentItemNumber: item,
        garmentColor: color,
        qtyBySize: {
          sizeXS: sizeXSqty,
          sizeS: sizeSqty,
          sizeM: sizeMqty,
          sizeL: sizeLqty,
          sizeXL: sizeXLqty,
          size2XL: size2XLqty,
          size3XL: size3XLqty,
        },
        totalQuantity: totalQuantity,
      };

      orderInfo.push(orderLI);
    }

    updateOrder(
      orderID,
      dateReq,
      mod,
      service,
      customerID,
      customerInfo,
      orderInfo
    );
  });
}

const transferOrderUpdate = document.getElementById('transfer-order-update');

if (transferOrderUpdate) {
  transferOrderUpdate.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('service').value;
    const options = document.getElementById('options-length').value;
    const dateReq = document.getElementById('dateReq').value;
    const mod = document.getElementById('mod').value;
    const orderID = document.getElementById('orderID').value;
    const customerID = document.getElementById('customerID').value;
    const firstName = document.getElementById('orderFirstName').value;
    const lastName = document.getElementById('orderLastName').value;
    const company = document.getElementById('orderCompany').value;
    const email = document.getElementById('orderEmail').value;
    const phone = document.getElementById('orderPhone').value;

    customerName = firstName + ' ' + lastName;

    const customerInfo = {
      customerName: customerName,
      company: company,
      email: email,
      phone: phone,
    };

    const orderInfo = [];
    for (let i = 1; i <= options; i++) {
      const height = document.getElementById(`height${i}`).value;
      const width = document.getElementById(`width${i}`).value;
      const quantity = document.getElementById(`quantity${i}`).value;
      const fileID = document.getElementById(`fileID${i}`).value;
      dimensions = width + '" wide x ' + height + '" tall';

      const orderLI = {
        dimensions: dimensions,
        fileID: fileID,
        quantity: quantity,
      };

      orderInfo.push(orderLI);
    }

    updateTransferOrder(
      orderID,
      dateReq,
      mod,
      service,
      customerID,
      customerInfo,
      orderInfo
    );
  });
}

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const logOutBtn = document.getElementById('logout');

if (logOutBtn) logOutBtn.addEventListener('click', logout);

const logOutBtn2 = document.getElementById('logout2');

if (logOutBtn2) logOutBtn2.addEventListener('click', logout);

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

    createaccount(
      customerNumber,
      firstName,
      lastName,
      company,
      email,
      password,
      passwordConfirm
    );
  });
}

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
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;

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

const userPasswordForm = document.querySelector('.form-user-password');

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

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
const orderInputElement = document.getElementById('orderPhone');
const messageInputElement = document.getElementById('messagePhone');

if (inputElement) {
  inputElement.addEventListener('keydown', enforceFormat);
  inputElement.addEventListener('keyup', formatToPhone);
}

if (orderInputElement) {
  orderInputElement.addEventListener('keydown', enforceFormat);
  orderInputElement.addEventListener('keyup', formatToPhone);
}

if (messageInputElement) {
  messageInputElement.addEventListener('keydown', enforceFormat);
  messageInputElement.addEventListener('keyup', formatToPhone);
}
