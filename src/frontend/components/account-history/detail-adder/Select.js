import {updatePaymentConfirmModal} from '../../../utils/payment.js';
import {COLORS} from '../../../constants/colors.js';

import PaymentConfirmModal from './PaymentConfirmModal.js';
import closeIcon from '../../../assets/close.svg';

export default class AccountHistoryDetailAdderSelect {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder-select-wrapper');
    $parent.appendChild(this.$target);

    this.model = model;
    this.state = state;
    this.$target.classList.add(this.state.name);
    if (this.state.name === 'payment') {
      this.model.subscribe('payments', this.render.bind(this));
    }
    if (this.state.name === 'category') {
      this.model.subscribe('categories', this.render.bind(this));
    }

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    const closeSelect = () => {
      this.$target.querySelector('.select-items').classList.add('hidden');
      const $selectLabel = this.$target.querySelector('.select-selected');
      $selectLabel.classList.remove('select-arrow-active');
    };

    this.$target.addEventListener('click', e => {
      const $selectLabel = e.target.closest('.select-selected');
      const $selectedItems = this.$target.querySelector('.select-items');
      if ($selectLabel) {
        $selectLabel.classList.toggle('select-arrow-active');
        $selectedItems.classList.toggle('hidden');
        return;
      }

      const $optionAddBtn = e.target.closest('button.select-item');
      if ($optionAddBtn) {
        updatePaymentConfirmModal('add');
        closeSelect();
        return;
      }

      const $selectItem = e.target.closest('div.select-item');
      if ($selectItem) {
        const {optionValue: selectedValue, optionTitle} = $selectItem.dataset;
        const $optionDeleteBtn = e.target.closest('.option-delete-btn');
        if ($optionDeleteBtn) {
          updatePaymentConfirmModal('delete', {value: selectedValue, title: optionTitle});
          closeSelect();
          return;
        }

        const $select = this.$target.querySelector('.history-detail-adder-select');
        $select.value = selectedValue;
        const event = new Event('input', {
          bubbles: true,
        });
        $select.dispatchEvent(event);
      }
    });

    this.$target.addEventListener('input', e => {
      const {tagName, value} = e.target;
      if (tagName === 'INPUT') return;
      const $selectLabel = this.$target.querySelector('.select-selected');
      $selectLabel.style.color = value ? COLORS.TITLE_ACTIVE : COLORS.LABEL;
      if (!value) $selectLabel.innerText = '???????????????';
      closeSelect();
      [...this.$target.querySelectorAll('div.select-item')].forEach($elem => {
        const {optionValue, optionTitle} = $elem.dataset;
        if (optionValue === value) {
          $elem.classList.add('same-as-selected');
          $selectLabel.innerHTML = optionTitle;
          return;
        }
        $elem.classList.remove('same-as-selected');
      });
    });
  }

  render() {
    const {name} = this.state;
    const {income, expenditure} = this.model.get('categories');
    const payments = this.model.get('payments');
    const options =
      name === 'category'
        ? [...income.map(v => ({...v, type: 'income'})), ...expenditure.map(v => ({...v, type: 'expenditure'}))]
        : payments;
    const optionData = options.map(({id, title, type}) => ({value: id, title, type}));
    this.$target.innerHTML = `
        <select id="${name}" name="${name}" class="history-detail-adder-select">
          ${optionData.map(({value, title}) => `<option value="${value}">${title}</option>`).join('')}
        </select>
        <div class="select-selected">???????????????</div>
        <div class="select-items hidden">
          ${optionData
            .map(
              ({value, title, type}) =>
                `<div class="select-item ${type === 'income' ? 'hidden' : ''}" ${
                  type ? `data-option-type="${type}"` : ''
                } data-option-value="${value}"  data-option-title="${title}">
                  ${title}
                  ${name === 'payment' ? `<img class="option-delete-btn" src="${closeIcon}" alt="close-icon"/>` : ''}
                </div>`,
            )
            .join('')}
            ${name === 'payment' ? `<button class="select-item">????????????</button>` : ``}
        </div>
    `;
    if (name === 'payment') {
      new PaymentConfirmModal({$parent: this.$target, model: this.model});
    }
  }
}
