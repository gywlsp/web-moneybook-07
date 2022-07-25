import AccountHistoryDetailListByDateHeader from './header.js';
import AccountHistoryDetailListByDateDetail from './detail.js';

export default class AccountHistoryDetailListByDate {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-by-date');

    $parent.appendChild(this.$target);
    this.model = model;
    this.state = state;

    this.render();
  }

  render() {
    const {dateString, totalIncome, totalExpenditure, details} = this.state.date;
    new AccountHistoryDetailListByDateHeader({
      $parent: this.$target,
      model: this.model,
      state: {dateString, totalIncome, totalExpenditure},
    });
    details.forEach(detail => {
      new AccountHistoryDetailListByDateDetail({
        $parent: this.$target,
        model: this.model,
        state: {dateString, ...detail},
      });
    });
  }
}
