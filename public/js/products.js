import axios from 'axios';
import { showAlert } from './alerts';

async function getProducts() {
  try {
    const username = '809298';
    const api_key = '1cac2247-e52a-4e93-9de6-add580f4566e';
    const res = await axios({
      method: 'POST',
      url: `https://api.ssactivewear.com/v2/products`,
      username: username,
      password: api_key,
    });

    if (res.data.status === 'success') {
      console.log('success', 'Products received successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
}
