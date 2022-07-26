import { CATEGORY_COLORS } from '../../../../constants/colors.js';

export default class AccountHistoryDetailListByDateDetail {
  constructor({ $parent, model, state }) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-by-date-detail');

    $parent.appendChild(this.$target);
    this.model = model;
    this.state = state;
    this.$target.dataset.id = this.state.id;

    this.render();
  }

  render() {
    const { category, description, payment, price } = this.state;
    this.$target.innerHTML = `
        <p class="category-title" style="background-color:${CATEGORY_COLORS[category.id]}">
            ${category.title}
        </p>
        <p class="description">
            ${description}
        </p>
        <p class="payment-title">
            ${payment.title || ''}
        </p>
        <p class="price">
            ${category.type === 'income' ? '' : '-'}${price.toLocaleString()}원
        </p>
    `;
  }
}
