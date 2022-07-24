export default class AccountHistoryCalendarFooter {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-calendar-footer');
    $parent.appendChild(this.$target);

    this.calendarModel = model;
    this.render();
  }

  render() {
    const {
      history: {totalIncome, totalExpenditure},
    } = this.calendarModel.getData();
    const total = totalIncome - totalExpenditure;
    this.$target.innerHTML = `
        <p>총 수입</p>
        <p>${totalIncome.toLocaleString()}</p>
        <p>총 지출</p>
        <p>${totalExpenditure.toLocaleString()}</p>
        <p>총계</p>
        <p>${total.toLocaleString()}</p>
    `;
  }
}
