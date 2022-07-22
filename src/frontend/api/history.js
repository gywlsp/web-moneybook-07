import API from './index.js';
import { getQueryString } from '../utils/api.js';

const AccountHistoryAPI = {
  getList: filter => {
    const queryString = getQueryString(filter);
    return API.get(`/api/account-history${queryString}`);
  },
  post: body => API.post('/api/account-history', body),
  put: (id, body) => API.put(`/api/account-history/${id}`, body),
  getCategories: (filter = {}) => {
    const queryString = getQueryString(filter);
    return API.get(`/api/account-history/categories${queryString}`);
  },
  getPayments: () => API.get('/api/account-history/payments'),
  postPayment: (body) => API.post('/api/account-history/payments', body),
  deletePayment: (id) => API.delete(`/api/account-history/payments/${id}`),
};

export default AccountHistoryAPI;
