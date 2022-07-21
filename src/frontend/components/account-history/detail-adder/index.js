import AccountHistoryAPI from '../../../api/history.js';
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
    this.$target.addEventListener('input', () => {
      const $dateStringInput = this.$target.querySelector('input[name="dateString"]');
      const $categorySelect = this.$target.querySelector('select[name="category"]');
      const $descriptionInput = this.$target.querySelector('input[name="description"]');
      const $paymentSelect = this.$target.querySelector('select[name="payment"]');
      const $priceInput = this.$target.querySelector('input[name="price"]');
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
  }

  render() {
    ADDER_ITEM_DATA.forEach(data => {
      new AccountHistoryDetailAdderItem({$parent: this.$target, model: this.detailModel, state: data});
    });
    new AccountHistoryDetailAdderSubmitBtn({$parent: this.$target, model: this.detailModel});
  }
}
