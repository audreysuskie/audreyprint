import axios from 'axios';
import { showAlert } from './alerts';

export const updateTransferOrder = async (
  orderID,
  dateReq,
  mod,
  service,
  customerID,
  customerInfo,
  orderInfo
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderID}`,
      data: {
        dateReq,
        mod,
        service,
        customerID,
        customerInfo,
        orderInfo,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'New order created successfully');
      const orderId = res.data.order;
      window.setTimeout(() => {
        location.assign(`/orderpage?order=${orderId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.res.data.message);
  }
};

export const updateOrder = async (
  orderID,
  dateReq,
  mod,
  service,
  customerID,
  customerInfo,
  orderInfo
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/orders/${orderID}`,
      data: {
        dateReq,
        mod,
        service,
        customerID,
        customerInfo,
        orderInfo,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'New order created successfully');
      const orderId = res.data.order;
      window.setTimeout(() => {
        location.assign(`/orderpage?order=${orderId}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.res.data.message);
  }
};

export const newOrder = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/orders/uploads`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'File uploaded successfully! Please complete your order.'
      );

      const orderId = res.data.order;
      window.setTimeout(() => {
        location.assign(`/completeOrder?order=${orderId}`);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    //showAlert('error', err.res.data.message);
  }
};
export const newTransferOrder = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/orders/uploads`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Files uploaded successfully! Please complete your order.'
      );

      const orderId = res.data.order;
      window.setTimeout(() => {
        location.assign(`/completeTransferOrder?order=${orderId}`);
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    //showAlert('error', err.res.data.message);
  }
};
