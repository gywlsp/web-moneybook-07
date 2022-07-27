/* eslint-disable no-param-reassign */
import AccountHistoryDetailListByDate from './by-date/index.js';
import AccountHistoryDetailListHeader from './header/index.js';

import {updateCategoryTypeToggleBtn} from '../../../utils/category.js';
import {getNumString} from '../../../utils/string.js';

export default class AccountHistoryDetailList {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-wrapper');

    $parent.appendChild(this.$target);
    this.model = model;

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
    const {dates} = this.model.get('history');

    const setDefaultValue = ($elem, defaultValue) => {
      $elem.dataset.defaultValue = defaultValue;
      $elem.value = defaultValue;
    };

    this.$target.addEventListener('click', e => {
      const $detailRow = e.target.closest('.history-detail-list-by-date-detail');
      if (!$detailRow) return;
      const {id} = $detailRow.dataset;
      const detailId = +id;
      let detailIndex = -1;
      const dateIndex = dates.findIndex(({details}) => {
        const dIndex = details.findIndex(v => v.id === detailId);
        if (dIndex === -1) return false;
        detailIndex = dIndex;
        return true;
      });

      const {dateString, details} = dates[dateIndex];
      const detail = details[detailIndex];
      const {category, description, payment, price} = detail;
      $detailAdder.dataset.id = detailId;
      setDefaultValue($dateStringInput, getNumString(dateString));
      setDefaultValue($categorySelect, category.id);
      setDefaultValue($descriptionInput, description);
      setDefaultValue($paymentSelect, payment.id);
      setDefaultValue($priceInput, price.toLocaleString());

      updateCategoryTypeToggleBtn(category.type);

      const event = new Event('input', {
        bubbles: true,
      });
      $categorySelect.dispatchEvent(event);
      $paymentSelect.dispatchEvent(event);

      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  render() {
    new AccountHistoryDetailListHeader({$parent: this.$target, model: this.model});
    const {dates} = this.model.get('history');
    dates.forEach(date => {
      new AccountHistoryDetailListByDate({$parent: this.$target, model: this.model, state: {date}});
    });
  }
}
