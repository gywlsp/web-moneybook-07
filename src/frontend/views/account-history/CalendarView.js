import '../../stylesheets/calendar.css';

import AccountHistoryCalendarHeader from '../../components/account-history/calendar/Header.js';
export default class AccountHistoryCalendarView {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('view-wrapper');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.detailModel.subscribe(this.render.bind(this));

    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    new AccountHistoryCalendarHeader({$parent: this.$target});
  }
}
