import DonutChart from './DonutChart.js';
import AccountHistoryNoResult from '../../NoResult.js';
import Table from './Table.js';

export default class AccountHistoryStatisticsMainPanel {
  constructor({ $parent, model }) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-statistics-main-panel');

    $parent.appendChild(this.$target);
    this.model = model;

    this.render();
  }

  render() {
    const { expenditure } = this.model.get('categories');
    if (!expenditure.length) {
      new AccountHistoryNoResult({ $parent: this.$target });
      return;
    }
    new DonutChart({ $parent: this.$target, model: this.model });
    new Table({ $parent: this.$target, model: this.model });
  }
}
