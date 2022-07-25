import GlobalStore from '../../../stores/global.js';
import {getDateCnt, getDateString, getTodayDateString} from '../../../utils/date.js';

export default class AccountHistoryCalendarHeaderContent {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-calendar-content');
    $parent.appendChild(this.$target);

    this.model = model;
    this.todayDateString = getTodayDateString();
    this.render();
  }

  getCalendarData() {
    const {year, month} = GlobalStore.get('globalState');
    const {history} = this.model.getData();
    const dateCnt = getDateCnt(month);
    let weekIndex = 0;
    const dateData = [...Array(dateCnt)].map((_, i) => {
      const date = i + 1;
      const fullDateString = getDateString({year, month, date});
      const dayIndex = new Date(fullDateString).getDay();
      const dateDetail = history.dates.find(v => v.dateString === fullDateString) || {
        totalIncome: 0,
        totalExpenditure: 0,
      };
      const {totalIncome, totalExpenditure} = dateDetail;
      const total = totalIncome - totalExpenditure;
      const result = {weekIndex, date, dayIndex, totalIncome, totalExpenditure, total};
      if (dayIndex === 6 && i !== dateCnt - 1) {
        weekIndex += 1;
      }
      return result;
    });

    const weekCnt = weekIndex + 1;
    const calendarData = dateData.reduce(
      (acc, curr) => {
        const {weekIndex, dayIndex} = curr;
        acc[weekIndex][dayIndex] = curr;
        return acc;
      },
      [...Array(weekCnt)].map(() => [...Array(7)].fill(null)),
    );
    return calendarData;
  }

  render() {
    const {year, month} = GlobalStore.get('globalState');
    const calendarData = this.getCalendarData();
    this.$target.innerHTML = calendarData
      .map(
        weekData => `<div class="week-row">
        ${weekData
          .map(dateDetail => {
            if (!dateDetail) return `<div class="date-item"></div>`;
            const {totalIncome, totalExpenditure, total, date} = dateDetail;
            const dateIsToday = getDateString({year, month, date}) === this.todayDateString;
            return `<div class="date-item${dateIsToday ? ' today' : ''}">
                ${
                  dateDetail
                    ? `<p class="total-income">${totalIncome ? totalIncome.toLocaleString() : ''}</p>
                    <p class="total-expenditure">${totalExpenditure ? `-${totalExpenditure.toLocaleString()}` : ''}</p>
                    <p class="total">${total ? total.toLocaleString() : ''}</p>
                    <p class="date">${date}</p>
                    `
                    : ''
                }
               </div>`;
          })
          .join('')}
        </div>`,
      )
      .join('');
  }
}
