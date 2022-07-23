import Router from '../Router.js';
import GlobalStore from '../stores/global.js';

import detailIcon from '../assets/file-text.svg';
import calendarIcon from '../assets/calendar.svg';
import chartIcon from '../assets/chart.svg';
import chevronLeftIcon from '../assets/chevron-left.svg';
import chevronRightIcon from '../assets/chevron-right.svg';
import {getNextMonth, getPrevMonth} from '../utils/date.js';

const TAB_DATA = [
  {
    name: 'detail',
    icon: detailIcon,
  },
  {
    name: 'calendar',
    icon: calendarIcon,
  },
  {
    name: 'statistics',
    icon: chartIcon,
  },
];

const ROUTES = {
  detail: '/',
  calendar: '/calendar',
  statistics: '/statistics',
};

export default class GlobalHeader {
  constructor() {
    this.$target = document.createElement('header');
    this.$target.classList.add('global-header');
    document.querySelector('#app').appendChild(this.$target);
    Router.subscribe('pathname', this.render.bind(this));
    GlobalStore.subscribe('globalState', this.render.bind(this));
    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $homeButton = e.target.closest('.home-button');
      if ($homeButton) {
        Router.set('pathname', '/detail');
        window.history.pushState({}, null, '/');
        return;
      }

      const $monthControlButton = e.target.closest('.month-controller > button');
      if ($monthControlButton) {
        const getNewMonth = $monthControlButton.classList.contains('prev-month-button') ? getPrevMonth : getNextMonth;
        const {year, month} = GlobalStore.get('globalState');
        const {year: newYear, month: newMonth} = getNewMonth({year, month});
        GlobalStore.set('globalState', {year: newYear, month: newMonth});
        return;
      }

      const $viewTab = e.target.closest('.view-tab');
      if ($viewTab) {
        const {name} = $viewTab.dataset;
        Router.set('pathname', `/${name}`);
        window.history.pushState({}, null, ROUTES[name]);
      }
    });
  }

  render() {
    const selectedTab = Router.get('pathname').slice(1);
    const {year, month} = GlobalStore.get('globalState');
    this.$target.innerHTML = `
    <button class="home-button">우아한 가계부 🧚🏻‍♀️</button>
    <div class="month-controller">
        <button class="prev-month-button">
            <img src="${chevronLeftIcon}" alt="Chevron Left Icon"/>
        </button>
        <div class="year-month-wrapper">
            <p class="month-view">${month}월</p>
            <p class="year-view">${year}</p>
        </div>
        <button class="next-month-button">
            <img src="${chevronRightIcon}" alt="Chevron Right Icon"/>
        </button>
    </div>
    <ul class="view-tabs-wrapper">
        ${TAB_DATA.map(
          ({name, icon}) => `<li data-name="${name}" class="view-tab ${selectedTab === name ? 'selected' : ''}">
                <img src="${icon}" alt="${name}-icon"/>
            </li>`,
        ).join('')}
    </ul> 
    `;
  }
}
