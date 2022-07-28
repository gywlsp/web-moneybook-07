/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';
import {hideLoadingIndicator, showLoadingIndicator} from '../../utils/loading.js';

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
      this.onCategoryMutate.apply(this);
    });
    Router.subscribe('pathname', () => {
      if (Router.get('pathname') === '/statistics') return;
      GlobalStore.set('statisticsState', {categoryId: null});
    });
    this.initData();
    this.setData();
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

  fetchCategory() {
    const {year: endYear, month: endMonth} = GlobalStore.get('globalState');
    const {categoryId} = GlobalStore.get('statisticsState');
    const date = new Date(`${endYear}.${padZero(endMonth)}.01`);
    date.setMonth(date.getMonth() - 5);
    const startYear = date.getFullYear();
    const startMonth = date.getMonth() + 1;
    return AccountHistoryAPI.getCategory(categoryId, {
      startYear,
      startMonth: padZero(startMonth),
      endYear,
      endMonth: padZero(endMonth),
    });
  }

  async onCategoryMutate() {
    showLoadingIndicator();
    Promise.all([this.fetchCategory(), this.fetchHistory()]).then(values => {
      const [categoryRecentMonthly, historyByCategory] = values;
      this.set('categoryRecentMonthly', categoryRecentMonthly);
      this.set('historyByCategory', historyByCategory);
      hideLoadingIndicator();
    });
  }

  initData() {
    this.init('categories', {expenditure: []});
    this.init('categoryRecentMonthly', []);
    this.init('historyByCategory', {});
  }

  async setData() {
    showLoadingIndicator();
    const {expenditure} = await this.fetchCategories();
    this.set('categories', {expenditure: expenditure.sort((a, b) => b.percentage - a.percentage)});
    hideLoadingIndicator();
  }
}
