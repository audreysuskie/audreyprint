import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateAccount';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      const dataType = type;
      const dataType2 = dataType.charAt(0).toUpperCase() + dataType.slice(1);

      showAlert('success', `${dataType2} updated successfully!`);
      console.log(res);
      window.setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    }
  } catch (err) {
    //console.log(err);
    showAlert('error', err.response.data.message);
  }
};
