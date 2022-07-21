import {CATEGORY_COLORS} from '../../../../constants/category.js';
import {getNumString} from '../../../../utils/string.js';

export default class AccountHistoryDetailListByDateDetail {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-by-date-detail');

    $parent.appendChild(this.$target);
    this.detailModel = model;
    this.state = state;

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    const $detailAdder = document.querySelector('.history-detail-adder');
    const $dateStringInput = $detailAdder.querySelector('input[name="dateString"]');
    const $categorySelect = $detailAdder.querySelector('select[name="category"]');
    const $descriptionInput = $detailAdder.querySelector('input[name="description"]');
    const $paymentSelect = $detailAdder.querySelector('select[name="payment"]');
    const $priceInput = $detailAdder.querySelector('input[name="price"]');

    this.$target.addEventListener('click', () => {
      const {dateString, id, category, description, payment, price} = this.state;
      $detailAdder.dataset.id = id;
      $dateStringInput.value = getNumString(dateString);
      $categorySelect.value = category.id;
      $descriptionInput.value = description;
      $paymentSelect.value = payment.id;
      $priceInput.value = price.toLocaleString();

      const event = new Event('input', {
        bubbles: true,
      });
      $categorySelect.dispatchEvent(event);
      $paymentSelect.dispatchEvent(event);
    });
  }

  render() {
    const {category, description, payment, price} = this.state;
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
