import '../../stylesheets/detail.css';

import AccountHistoryDetailAdder from '../../components/account-history/detail-adder/index.js';
import AccountHistoryDetailList from '../../components/account-history/detail-list/index.js';

export default class AccountHistoryDetailView {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('view-wrapper');
    $parent.appendChild(this.$target);

    this.model = model;

    this.render();
  }

  render() {
    new AccountHistoryDetailAdder({$parent: this.$target, model: this.model});
    new AccountHistoryDetailList({$parent: this.$target, model: this.model});
  }
}
