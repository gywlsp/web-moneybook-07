import './stylesheets/style.css';
import './stylesheets/global.css';

import Router from './Router.js';
import AccountHistoryDetailModel from './models/account-history/DetailModel.js';
import AccountHistoryCalendarModel from './models/account-history/CalendarModel.js';
import AccountHistoryStatisticsModel from './models/account-history/StatisticsModel.js';

import GlobalHeader from './components/GlobalHeader.js';
import AccountHistoryDetailView from './views/account-history/DetailView.js';
import AccountHistoryCalendarView from './views/account-history/CalendarView.js';
import AccountHistoryStatisticsView from './views/account-history/StatisticsView.js';
import LoadingIndicator from './components/LoadingIndicator.js';

const TAB_DATA = {
  '/': {
    Model: AccountHistoryDetailModel,
    View: AccountHistoryDetailView,
  },
  '/calendar': {
    Model: AccountHistoryCalendarModel,
    View: AccountHistoryCalendarView,
  },
  '/statistics': {
    Model: AccountHistoryStatisticsModel,
    View: AccountHistoryStatisticsView,
  },
};

export default class App {
  constructor({$parent}) {
    this.$target = document.createElement('div');
    this.$target.id = 'app';
    $parent.appendChild(this.$target);

    Router.subscribe('pathname', this.renderView.bind(this));
    this.render();
  }

  render() {
    new GlobalHeader({$parent: this.$target});
    new LoadingIndicator({$parent: this.$target});
    this.renderView();
  }

  renderView() {
    this.$view?.remove();

    const pathname = Router.get('pathname');
    const {Model, View} = TAB_DATA[pathname];

    const model = new Model();
    const view = new View({$parent: this.$target, model});

    this.$view = view.$target;
  }
}
