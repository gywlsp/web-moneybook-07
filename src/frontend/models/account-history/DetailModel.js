import Observer from '../index.js';
import globalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';

export default class AccountHistoryDetailModel extends Observer {
  constructor() {
    super();
    globalStore.subscribe('globalState', this.fetchHistory.bind(this));
    globalStore.subscribe('detailState', this.fetchHistory.bind(this));
    this.setData();
  }

  getData() {
    return this.data;
  }

  fetchHistory() {
    const {year, month} = globalStore.get('globalState');
    const {income, expenditure} = globalStore.get('detailState');
    AccountHistoryAPI.getList({year, month: padZero(month), income, expenditure}, history => {
    this.data = {...this.data, history};
    });
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
    this.data = {...this.data, categories};
  }

  fetchPayments() {
    const payments = []; // fetch
    this.data = {...this.data, payments};
  }

  setData() {
    this.data = {};
    this.fetchHistory();
    this.fetchCategories();
    this.fetchPayments();
    this.notify();
  }

  mutateHistory() {
    this.fetchHistory();
    this.notify();
  }

  mutatePayments() {
    this.fetchHistory();
    this.fetchPayments();
    this.notify();
  }
}
