import AccountHistoryDetailAdderItem from './Item.js';

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
  }

  render() {
    ADDER_ITEM_DATA.forEach(data => {
      new AccountHistoryDetailAdderItem({$parent: this.$target, model: this.detailModel, state: data});
    });
  }
}
