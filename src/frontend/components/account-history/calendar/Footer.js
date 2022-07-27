export default class AccountHistoryCalendarFooter {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-calendar-footer');
    $parent.appendChild(this.$target);

    this.model = model;
    this.render();
  }

  render() {
    const {totalIncome, totalExpenditure} = this.model.get('history');
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
