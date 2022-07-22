import AccountHistoryAPI from '../../../api/history.js';
import {addDot} from '../../../utils/date.js';
import {getNumString} from '../../../utils/string.js';
import {updateCategoryTypeToggleBtn} from '../../../utils/category.js';

import AccountHistoryDetailAdderItem from './Item.js';
import AccountHistoryDetailAdderSubmitBtn from './SubmitBtn.js';

const ADDER_ITEM_DATA = [
  {label: '일자', name: 'dateString', itemType: 'input'},
  {label: '분류', name: 'category', itemType: 'select'},
  {label: '내용', name: 'description', itemType: 'input'},
  {label: '결제수단', name: 'payment', itemType: 'select'},
  {label: '금액', name: 'price', itemType: 'input'},
];

export default class AccountHistoryDetailAdder {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder');

    $parent.appendChild(this.$target);
    this.detailModel = model;

    this.render();
    this.handleEvent();
  }

  submitForm() {
    const {id} = this.$target.dataset;
    const submit = () =>
      id === undefined ? AccountHistoryAPI.post(this.formData) : AccountHistoryAPI.put(id, this.formData);
    submit().then(() => {
      this.detailModel.mutateHistory();
    });
  }

  handleEvent() {
    const $submitBtn = this.$target.querySelector('.history-detail-adder-submitBtn');
    const $dateStringInput = this.$target.querySelector('input[name="dateString"]');
    const $categorySelect = this.$target.querySelector('select[name="category"]');
    const $descriptionInput = this.$target.querySelector('input[name="description"]');
    const $paymentSelect = this.$target.querySelector('select[name="payment"]');
    const $priceInput = this.$target.querySelector('input[name="price"]');

    this.$target.addEventListener('input', () => {
      if (
        $dateStringInput.value.length !== 8 ||
        !$categorySelect.value ||
        !$descriptionInput.value ||
        !$paymentSelect.value ||
        !$priceInput.value
      ) {
        $submitBtn.disabled = true;
        return;
      }
      $submitBtn.disabled = false;
    });

    this.$target.addEventListener('click', e => {
      const $categoryTypeToggleBtn = e.target.closest('.category-type-toggleBtn');
      if ($categoryTypeToggleBtn) {
        const {categoryType} = $categoryTypeToggleBtn.dataset;
        const newCategoryType = categoryType === 'expenditure' ? 'income' : 'expenditure';
        updateCategoryTypeToggleBtn(newCategoryType);
        return;
      }

      const $submitBtn = e.target.closest('.history-detail-adder-submitBtn');
      if (!$submitBtn) return;

      const dateString = addDot($dateStringInput.value);
      const categoryId = +$categorySelect.value;
      const description = $descriptionInput.value;
      const paymentId = +$paymentSelect.value;
      const price = +getNumString($priceInput.value);

      this.formData = {
        dateString,
        categoryId,
        description,
        paymentId,
        price,
      };

      this.submitForm();
    });
  }

  render() {
    ADDER_ITEM_DATA.forEach(data => {
      new AccountHistoryDetailAdderItem({$parent: this.$target, model: this.detailModel, state: data});
    });
    new AccountHistoryDetailAdderSubmitBtn({$parent: this.$target, model: this.detailModel});
  }
}
