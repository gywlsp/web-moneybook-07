import '../../stylesheets/statistics.css';

import MainPanel from '../../components/account-history/statistics/MainPanel.js';

export default class AccountHistoryStatisticsView {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('view-wrapper');
    $parent.appendChild(this.$target);

    this.model = model;
    this.model.subscribe(this.render.bind(this));

    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    new MainPanel({$parent: this.$target, model: this.model});
  }
}
