/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryCalendarModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/calendar') return;
      this.initData.apply(this);
    });
    this.data = {
      history: {totalDetailCnt: 0, totalIncome: 0, totalExpenditure: 0, dates: []},
    };
    this.initData();
  }

  getData() {
    return this.data;
  }

  fetchHistory() {
    const {year, month} = GlobalStore.get('globalState');
    return AccountHistoryAPI.getList({year, month: padZero(month), income: true, expenditure: true});
  }

  async initData() {
    const history = await this.fetchHistory();
    this.data = {history};
    this.notify();
  }
}
