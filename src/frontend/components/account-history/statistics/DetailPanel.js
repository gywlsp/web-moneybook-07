import GlobalStore from '../../../stores/global.js';
import AccountHistoryDetailListByDate from '../detail-list/by-date/index.js';

export default class AccountHistoryStatisticsDetailPanel {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-statistics-detail-panel');

    $parent.appendChild(this.$target);
    this.model = model;
    GlobalStore.subscribe('statisticsState', () => {
      if (GlobalStore.get('statisticsState').categoryId === null) return;
      this.$target.remove();
      this.render.apply(this);
    });

    this.render();
  }

  render() {
    if (GlobalStore.get('statisticsState').categoryId === null) return;
    const {history} = this.model.getData();
    history?.dates
      ?.map(date => ({...date, totalExpenditure: 0}))
      .forEach(date => {
        new AccountHistoryDetailListByDate({$parent: this.$target, model: this.model, state: {date}});
      });
  }
}
