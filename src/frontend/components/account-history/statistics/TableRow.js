import {CATEGORY_COLORS} from '../../../constants/category.js';
import GlobalStore from '../../../stores/global.js';

export default class AccountHistoryStatisticsTableRow {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('button');
    this.$target.classList.add('table-row');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;
    const {id} = this.state;
    this.$target.dataset.id = id;

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', () => {
      const {id} = this.$target.dataset;
      GlobalStore.set('statisticsState', {categoryId: +id});
    });
  }

  render() {
    const {id, title, percentage, total} = this.state;
    this.$target.innerHTML = `
            <p class="category-title" style="background-color:${CATEGORY_COLORS[id]}">
                ${title}
            </p>
            <p class="category-percentage">
                ${Math.round(percentage)}%
            </p>
            <p class="category-total">
                ${total.toLocaleString()}원
            </p>
        `;
  }
}
