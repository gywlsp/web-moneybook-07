import GlobalStore from '../../../../stores/global.js';

import checkIcon from '../../../../assets/check.svg';

export default class AccountHistoryDetailListHeaderFilterItem {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-filter-item');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;
    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', () => {
      const {name, checked} = this.state;
      const detailState = GlobalStore.get('detailState');
      GlobalStore.set('detailState', {...detailState, [name]: !checked});
    });
  }

  render() {
    const {name, total, checked} = this.state;
    this.$target.innerHTML = `
        <input type="checkbox" id=${name} name=${name}/>
        <label for="${name}">
            <span class="${checked ? 'checked' : ''}">
                <img src="${checkIcon}" alt="check-icon"/>
            </span>
            <p>
                ${name === 'income' ? '수입' : '지출'} ${total.toLocaleString()}
            </p>
        </label>
    `;
  }
}
