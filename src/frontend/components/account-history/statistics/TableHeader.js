export default class AccountHistoryStatisticsTableHeader {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('table-header');
    $parent.appendChild(this.$target);

    this.model = model;

    this.render();
  }

  render() {
    const {expenditure} = this.model.get('categories');
    const totalExpenditure = expenditure.reduce((acc, curr) => acc + curr.total, 0);
    if (!totalExpenditure) return;

    this.$target.innerHTML = `
            <p class="table-header-title">이번 달 지출 금액</p>
            <p>${totalExpenditure.toLocaleString()}</p>
        `;
  }
}
