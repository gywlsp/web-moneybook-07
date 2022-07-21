import AccountHistoryDetailAdderInput from './Input.js';
import AccountHistoryDetailAdderSelect from './Select.js';

export default class AccountHistoryDetailAdderItem {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder-item');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;

    this.render();
  }

  render() {
    const {label, name, itemType} = this.state;
    this.$target.innerHTML = `
        <label for="${name}">${label}</label>
    `;
    const DetailAdderComponent =
      itemType === 'input' ? AccountHistoryDetailAdderInput : AccountHistoryDetailAdderSelect;
    new DetailAdderComponent({$parent: this.$target, model: this.detailModel, state: {name}});
  }
}
