/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import globalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryDetailModel extends Observer {
  constructor() {
    super();
    globalStore.subscribe('globalState', this.mutateHistory.bind(this));
    globalStore.subscribe('detailState', this.mutateHistory.bind(this));
    this.data = {
      history: {totalIncome: 0, totalExpenditure: 0, dates: []},
      categories: {income: [], expenditure: []},
      payments: [],
    };
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchHistory() {
    const {year, month} = globalStore.get('globalState');
    const {income, expenditure} = globalStore.get('detailState');
    return AccountHistoryAPI.getList({year, month: padZero(month), income, expenditure});
  }

  fetchCategories() {
    const categories = {
      income: [
        {
          id: 1,
          title: '생활',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 2,
          title: '식비',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 3,
          title: '쇼핑/뷰티',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 4,
          title: '의료/건강',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 5,
          title: '문화/여가',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 6,
          title: '미분류',
          percentage: 'number',
          total: 'number',
        },
      ],
      expenditure: [
        {
          id: 7,
          title: '월급',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 8,
          title: '용돈',
          percentage: 'number',
          total: 'number',
        },
        {
          id: 9,
          title: '기타 수입',
          percentage: 'number',
          total: 'number',
        },
      ],
    }; // fetch
    return categories;
  }

  fetchPayments() {
    const payments = [
      {id: 1, title: '현금'},
      {id: 2, title: '신용카드'},
    ]; // fetch
    return payments;
  }

  setData() {
    Promise.all([this.fetchHistory(), this.fetchCategories(), this.fetchPayments()]).then(values => {
      const [history, categories, payments] = values;
      this.data = {history, categories, payments};
      this.notify();
    });
  }

  mutateHistory() {
    this.fetchHistory().then(history => {
      this.data = {...this.data, history};
      this.notify();
    });
  }

  mutatePayments() {
    Promise.all([this.fetchHistory(), this.fetchPayments()]).then(values => {
      const [history, payments] = values;
      this.data = {...this.data, history, payments};
      this.notify();
    });
  }
}
