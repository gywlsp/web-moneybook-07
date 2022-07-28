import AccountHistoryAPI from '../../../api/history.js';
import {addDot} from '../../../utils/date.js';
import {getNumString} from '../../../utils/string.js';
import {updateCategoryTypeToggleBtn} from '../../../utils/category.js';

import AccountHistoryDetailAdderItem from './Item.js';
import AccountHistoryDetailAdderSubmitBtn from './SubmitBtn.js';
import {showLoadingIndicator, hideLoadingIndicator} from '../../../utils/loading.js';

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
    this.model = model;

    this.render();
    this.handleEvent();
  }

  async submitForm() {
    const {id} = this.$target.dataset;
    const submit = () =>
      id === undefined ? AccountHistoryAPI.post(this.formData) : AccountHistoryAPI.put(id, this.formData);
    try {
      showLoadingIndicator();
      await submit();
      await this.model.onHistoryMutate();
      resetHistoryDetailAdderForm();
      hideLoadingIndicator();
    } catch (err) {
      alert(`수입/지출 내역 ${id === undefined ? '추가' : '수정'} 요청이 실패했습니다.`);
    }
  }

  handleEvent() {
    const isFormValid = ({dateString, categoryId, description, paymentId, price}) =>
      dateString.length === 8 &&
      categoryId &&
      description &&
      ($paymentSelect.dataset.defaultValue === '' || paymentId) &&
      price;

    const isFormNotChanged = ({
      dateString,
      categoryId,
      description,
      paymentId,
      price,
      defaultDateString,
      defaultCategoryId,
      defaultDescription,
      defaultPaymentId,
      defaultPrice,
    }) =>
      dateString === defaultDateString &&
      categoryId === defaultCategoryId &&
      description === defaultDescription &&
      paymentId === defaultPaymentId &&
      price === defaultPrice;

      const {$dateStringInput, $categorySelect, $descriptionInput, $paymentSelect, $priceInput} =
        getHistoryDetailAdderItems(this.$target);
      const {
        value: dateString,
        dataset: {defaultValue: defaultDateString},
      } = $dateStringInput;
      const {
        value: categoryId,
        dataset: {defaultValue: defaultCategoryId},
      } = $categorySelect;
      const {
        value: description,
        dataset: {defaultValue: defaultDescription},
      } = $descriptionInput;
      const {
        value: paymentId,
        dataset: {defaultValue: defaultPaymentId},
      } = $paymentSelect;
      const {
        value: price,
        dataset: {defaultValue: defaultPrice},
      } = $priceInput;

      const $submitBtn = this.$target.querySelector('.history-detail-adder-submitBtn');
      $submitBtn.disabled =
        !isFormValid({dateString, categoryId, description, paymentId, price}) ||
        (this.$target.dataset.id &&
          isFormNotChanged({
            dateString,
            categoryId,
            description,
            paymentId,
            price,
            defaultDateString,
            defaultCategoryId,
            defaultDescription,
            defaultPaymentId,
            defaultPrice,
          })) ||
        false;
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
      if (!$submitBtn || $submitBtn.disabled) return;

      const {$dateStringInput, $categorySelect, $descriptionInput, $paymentSelect, $priceInput} =
        getHistoryDetailAdderItems(this.$target);
      const dateString = addDot($dateStringInput.value);
      const categoryId = +$categorySelect.value;
      const description = $descriptionInput.value;
      const paymentId = +$paymentSelect.value || null;
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
      new AccountHistoryDetailAdderItem({$parent: this.$target, model: this.model, state: data});
    });
    new AccountHistoryDetailAdderSubmitBtn({$parent: this.$target, model: this.model});
  }
}
