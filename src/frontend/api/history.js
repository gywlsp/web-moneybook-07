import API from './index.js';
import {getQueryString} from '../utils/api.js';

const AccountHistoryAPI = {
  getList: (filter, resCallback) => {
    const queryString = getQueryString(filter);
    API.get(`/api/account-history${queryString}`).then(resCallback);
  },
};

export default AccountHistoryAPI;
