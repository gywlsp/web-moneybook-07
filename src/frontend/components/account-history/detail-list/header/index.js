import globalStore from '../../../../stores/global.js';

import FilterItem from './FilterItem.js';

export default class AccountHistoryDetailListHeader {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-header');

    $parent.appendChild(this.$target);
    this.detailModel = model;

    this.render();
  }

  render() {
    const {
      history: {totalDetailCnt, totalIncome, totalExpenditure},
    } = this.detailModel.getData();
    this.$target.innerHTML = `
        <p class="history-detail-list-total-cnt">전체 내역 ${totalDetailCnt}건</p>
    `;
    const {income, expenditure} = globalStore.get('detailState');
    new FilterItem({
      $parent: this.$target,
      model: this.detailModel,
      state: {name: 'income', total: totalIncome, checked: income},
    });
    new FilterItem({
      $parent: this.$target,
      model: this.detailModel,
      state: {name: 'expenditure', total: totalExpenditure, checked: expenditure},
    });
  }
}