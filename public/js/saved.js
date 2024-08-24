import axios from 'axios';
import { showAlert } from './alerts';

export const saved = async (brand, styleid, style) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/addToSaved`,
      data: {
        brand,
        styleid,
        style,
      },
    });

    if (res.data.status === 'success') {
      console.log('success', 'Item saved successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
