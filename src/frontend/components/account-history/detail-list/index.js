import AccountHistoryDetailListByDate from './by-date/index.js';
import AccountHistoryDetailListHeader from './header/index.js';

export default class AccountHistoryDetailList {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-wrapper');

    $parent.appendChild(this.$target);
    this.detailModel = model;

    this.render();
  }

  render() {
    new AccountHistoryDetailListHeader({$parent: this.$target, model: this.detailModel});
    const {
      history: {dates},
    } = this.detailModel.getData();
    dates.forEach(date => {
      new AccountHistoryDetailListByDate({$parent: this.$target, model: this.detailModel, state: {date}});
    });
  }
}
