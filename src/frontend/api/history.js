import API from './index.js';
import {getQueryString} from '../utils/api.js';

const AccountHistoryAPI = {
  getList: filter => {
    const queryString = getQueryString(filter);
    return API.get(`/api/account-history${queryString}`);
  },
};

export default AccountHistoryAPI;
