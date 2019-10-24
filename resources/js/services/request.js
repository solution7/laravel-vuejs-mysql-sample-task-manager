const axios = require('axios');

const axiosInstance = axios.create({
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  baseURL: '/api',
});

export default axiosInstance;
