import {getTodayDateString} from '../../../utils/date.js';
import {getNumString} from '../../../utils/string.js';

import minusIcon from '../../../assets/minus.svg';

export default class AccountHistoryDetailAdderInput {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder-input-wrapper');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('input', e => {
      const {name, value} = e.target;
      if (value === '') return;
      if (name === 'dateString') {
        e.target.value = getNumString(value);
        return;
      }
      if (name === 'price') {
        e.target.value = Number(getNumString(value)).toLocaleString();
      }
    });
  }

  render() {
    const {name} = this.state;
    const defaultValue = name === 'dateString' ? getTodayDateString() : '';
    const inputMaxLen = name === 'dateString' ? 'maxlength="8"' : '';
    const [toggleBtn, priceUnit] =
      name === 'price'
        ? [
            `
        <button class="category-type-toggleBtn" data-category-type="expenditure">
            <img src="${minusIcon}" alt="minus-icon" />
        </button>`,
            '<p>원</p>',
          ]
        : ['', ''];
    this.$target.innerHTML = `
        ${toggleBtn}
        <input id="${name}" class="history-detail-adder-input" name="${name}" value="${defaultValue}" placeholder="입력하세요" ${inputMaxLen}/> 
        ${priceUnit}
    `;
  }
}
