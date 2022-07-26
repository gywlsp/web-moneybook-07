/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import { padZero } from '../../utils/date.js';

export default class AccountHistoryStatisticsModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/statistics') return;
      GlobalStore.set('statisticsState', { categoryId: null });
      this.setData.apply(this);
    });
    GlobalStore.subscribe('statisticsState', () => {
      if (Router.get('pathname') !== '/statistics' || GlobalStore.get('statisticsState').categoryId === null) return;
      this.mutateCategory.apply(this);
    });
    this.data = {
      categories: { expenditure: [] },
    };
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchCategories() {
    const { year, month } = GlobalStore.get('globalState');
    return AccountHistoryAPI.getCategories({ year, month: padZero(month) });
  }

  fetchHistory() {
    const { year, month } = GlobalStore.get('globalState');
    const { categoryId } = GlobalStore.get('statisticsState');
    return AccountHistoryAPI.getList({ year, month: padZero(month), categoryId });
  }

  fetchCategory() {
    const { year: endYear, month: endMonth } = GlobalStore.get('globalState');
    const { categoryId } = GlobalStore.get('statisticsState');
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

  async mutateCategory() {
    Promise.all([this.fetchHistory(), this.fetchCategory()]).then(values => {
      const [history, categoryMonthData] = values;
      this.data = { ...this.data, history, categoryMonthData };
      this.notify();
    });
  }

  async setData() {
    const { expenditure } = await this.fetchCategories();
    this.data = { ...this.data, categories: { expenditure: expenditure.sort((a, b) => b.percentage - a.percentage) } };
    this.notify();
  }
}
