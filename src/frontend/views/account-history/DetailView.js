import globalStore from '../../stores/global.js';
import AccountHistoryDetailAdder from '../../components/account-history/detail-adder/index.js';

export default class AccountHistoryDetailView {
  constructor({model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('view-wrapper');
    document.querySelector('#app').appendChild(this.$target);

    globalStore.subscribe('selectedTab', this.render.bind(this));
    this.detailModel = model;
    this.detailModel.subscribe(this.render.bind(this));

    this.render();
  }

  render() {
    const selectedTab = globalStore.get('selectedTab');
    if (selectedTab !== 'detail') {
      this.$target.style.display = 'none';
      return;
    }
    this.$target.innerHTML = '';
    this.$target.style.display = 'flex';
    new AccountHistoryDetailAdder({$parent: this.$target, model: this.detailModel});
  }
}
