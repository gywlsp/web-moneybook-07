import Router from './Router.js';
import AccountHistoryDetailModel from './models/account-history/DetailModel.js';
import AccountHistoryCalendarModel from './models/account-history/CalendarModel.js';

import GlobalHeader from './components/GlobalHeader.js';
import AccountHistoryDetailView from './views/account-history/DetailView.js';
import AccountHistoryCalendarView from './views/account-history/CalendarView.js';

const TAB_DATA = {
  '/detail': {
    Model: AccountHistoryDetailModel,
    View: AccountHistoryDetailView,
  },
  '/calendar': {
    Model: AccountHistoryCalendarModel,
    View: AccountHistoryCalendarView,
  },
};

export default class App {
  constructor({$parent}) {
    const $app = document.createElement('div');
    $app.id = 'app';
    this.$target = $app;
    $parent.appendChild($app);

    Router.subscribe('pathname', this.renderView.bind(this));
    this.render();
  }

  render() {
    new GlobalHeader();
    this.renderView();
  }

  renderView() {
    this.$view?.remove();

    const pathname = Router.get('pathname');
    if (pathname === '/statistics') return; // 나중에 statistics 추가하면 제거
    const {Model, View} = TAB_DATA[pathname];

    const model = new Model();
    const view = new View({$parent: this.$target, model});

    this.$view = view.$target;
  }
}
