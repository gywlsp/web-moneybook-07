import GlobalStore from '../../../stores/global.js';
import AccountHistoryDetailListByDate from '../detail-list/by-date/index.js';
import AccountHistoryStatisticsLineChart from './LineChart.js';

export default class AccountHistoryStatisticsDetailPanel {
  constructor({ $parent, model }) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-statistics-detail-panel');
    this.$target.classList.add('hidden');
    $parent.appendChild(this.$target);

    this.model = model;

    this.render();
  }

  render() {
    if (GlobalStore.get('statisticsState').categoryId === null) return;
    this.$target.classList.remove('hidden')
    const { history } = this.model.getData();
    new AccountHistoryStatisticsLineChart({ $parent: this.$target, model: this.model })
    history?.dates
      ?.map(date => ({ ...date, totalExpenditure: 0 }))
      .forEach(date => {
        new AccountHistoryDetailListByDate({ $parent: this.$target, model: this.model, state: { date } });
      });
    this.$target.scrollIntoView({behavior: 'smooth'});
  }
}
