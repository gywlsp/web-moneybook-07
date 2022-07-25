import {DAY_LABELS} from '../../../../constants/date.js';

export default class AccountHistoryDetailListByDateHeader {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-by-date-header');

    $parent.appendChild(this.$target);
    this.model = model;
    this.state = state;

    this.render();
  }

  render() {
    const {dateString, totalIncome, totalExpenditure} = this.state;
    const currDate = new Date(dateString);
    const [month, date, dayLabel] = [currDate.getMonth() + 1, currDate.getDate(), DAY_LABELS[currDate.getDay()]];
    const totalInfoString = [totalIncome, totalExpenditure].reduce((acc, curr, index) => {
      if (!curr) return acc;
      const label = index === 0 ? '수입' : '지출';
      return acc.concat(` ${label} ${curr.toLocaleString()}`);
    }, '');

    this.$target.innerHTML = `
        <div class="history-detail-list-by-date-header-date-wrapper">
            <p>
                <strong>${month}월 ${date}일 </strong>
                ${dayLabel}
            </p>
        </div>
        <p>
            ${totalInfoString}
        </p>
    `;
  }
}
