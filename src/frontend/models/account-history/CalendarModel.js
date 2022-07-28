/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';
import {hideLoadingIndicator, showLoadingIndicator} from '../../utils/loading.js';

export default class AccountHistoryCalendarModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/calendar') return;
      this.setData.apply(this);
    });
    this.initData();
    this.setData();
  }

  fetchHistory() {
    const {year, month} = GlobalStore.get('globalState');
    return AccountHistoryAPI.getList({year, month: padZero(month), income: true, expenditure: true});
  }

  initData() {
    this.init('history', {totalDetailCnt: 0, totalIncome: 0, totalExpenditure: 0, dates: []});
  }

  async setData() {
    showLoadingIndicator();
    const history = await this.fetchHistory();
    this.set('history', history);
    hideLoadingIndicator();
  }
}
