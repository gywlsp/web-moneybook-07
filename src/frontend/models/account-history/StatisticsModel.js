/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryStatisticsModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/statistics') return;
      GlobalStore.set('statisticsState', {categoryId: null});
      this.setData.apply(this);
    });
    GlobalStore.subscribe('statisticsState', () => {
      if (Router.get('pathname') !== '/statistics' || GlobalStore.get('statisticsState').categoryId === null) return;
      this.mutateHistory.apply(this);
    });
    this.data = {
      categories: {expenditure: [], history: {totalDetailCnt: 0, totalIncome: 0, totalExpenditure: 0, dates: []}},
    };
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchCategories() {
    const {year, month} = GlobalStore.get('globalState');
    return AccountHistoryAPI.getCategories({year, month: padZero(month)});
  }

  fetchHistory() {
    const {year, month} = GlobalStore.get('globalState');
    const {categoryId} = GlobalStore.get('statisticsState');
    return AccountHistoryAPI.getList({year, month: padZero(month), categoryId});
  }

  async mutateHistory() {
    const history = await this.fetchHistory();
    this.data = {...this.data, history};
    this.notify();
  }

  async setData() {
    const {expenditure} = await this.fetchCategories();
    this.data = {...this.data, categories: {expenditure: expenditure.sort((a, b) => b.percentage - a.percentage)}};
    this.notify();
  }
}
