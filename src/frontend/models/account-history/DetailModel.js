/* eslint-disable class-methods-use-this */
import Observer from '../index.js';
import Router from '../../Router.js';
import GlobalStore from '../../stores/global.js';
import AccountHistoryAPI from '../../api/history.js';
import {padZero} from '../../utils/date.js';
import {hideLoadingIndicator, showLoadingIndicator} from '../../utils/loading.js';

export default class AccountHistoryDetailModel extends Observer {
  constructor() {
    super();
    GlobalStore.subscribe('globalState', () => {
      if (Router.get('pathname') !== '/') return;
      this.setData.apply(this);
    });
    GlobalStore.subscribe('detailState', this.onHistoryMutate.bind(this));
    this.initData();
    this.setData();
  }

  fetchHistory() {
    const {year, month} = GlobalStore.get('globalState');
    const {income, expenditure} = GlobalStore.get('detailState');
    return AccountHistoryAPI.getList({year, month: padZero(month), income, expenditure});
  }

  fetchCategories() {
    return AccountHistoryAPI.getCategories();
  }

  fetchPayments() {
    return AccountHistoryAPI.getPayments();
  }

  async onHistoryMutate() {
    const history = await this.fetchHistory();
    this.set('history', history);
  }

  onPaymentMutate() {
    Promise.all([this.fetchHistory(), this.fetchPayments()]).then(values => {
      const [history, payments] = values;
      this.set('history', history);
      this.set('payments', payments);
    });
  }

  initData() {
    this.init('history', {totalDetailCnt: 0, totalIncome: 0, totalExpenditure: 0, dates: []});
    this.init('categories', {income: [], expenditure: []});
    this.init('payments', []);
  }

  setData() {
    showLoadingIndicator();
    Promise.all([this.fetchHistory(), this.fetchCategories(), this.fetchPayments()]).then(values => {
      const [history, categories, payments] = values;
      this.set('categories', categories);
      this.set('payments', payments);
      this.set('history', history);
      hideLoadingIndicator();
    });
  }
}
