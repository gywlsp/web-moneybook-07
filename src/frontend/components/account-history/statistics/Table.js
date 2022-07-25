import TableHeader from './TableHeader.js';
import TableRow from './TableRow.js';

export default class AccountHistoryStatisticsTable {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('table-wrapper');

    $parent.appendChild(this.$target);
    this.model = model;

    this.render();
  }

  render() {
    const {
      categories: {expenditure},
    } = this.model.getData();
    new TableHeader({$parent: this.$target, model: this.model});
    expenditure.forEach(state => {
      new TableRow({$parent: this.$target, model: this.model, state});
    });
  }
}
