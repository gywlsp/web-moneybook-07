import {getTodayDateString} from '../../../utils/date.js';
import {getNumString} from '../../../utils/string.js';

import minusIcon from '../../../assets/minus.svg';
import plusIcon from '../../../assets/plus.svg';

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

    this.$target.addEventListener('click', e => {
      const $toggleBtn = e.target.closest('.plus-minus-toggleBtn');
      if ($toggleBtn) {
        const $toggleIcon = this.$target.querySelector('.plus-minus-toggleBtn > img');
        const [newSrc, newAlt] = $toggleIcon.alt === 'minus-icon' ? [plusIcon, 'plus-icon'] : [minusIcon, 'minus-icon'];
        $toggleIcon.src = newSrc;
        $toggleIcon.alt = newAlt;
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
        <button class="plus-minus-toggleBtn">
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
