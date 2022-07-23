import {DAY_LABELS} from '../../../constants/date.js';

export default class AccountHistoryCalendarHeader {
  constructor({$parent}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-calendar-header');
    $parent.appendChild(this.$target);

    this.render();
  }

  render() {
    this.$target.innerHTML = DAY_LABELS.map(value => `<div class="day-label">${value}</div>`).join('');
  }
}
