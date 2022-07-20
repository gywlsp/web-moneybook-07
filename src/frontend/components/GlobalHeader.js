import globalStore from '../stores/global.js';

import detailIcon from '../assets/file-text.svg';
import calendarIcon from '../assets/calendar.svg';
import chartIcon from '../assets/chart.svg';
import chevronLeftIcon from '../assets/chevron-left.svg';
import chevronRightIcon from '../assets/chevron-right.svg';
import {getNextMonth, getPrevMonth} from '../utils/date.js';

const tabData = [
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

export default class GlobalHeader {
  constructor() {
    this.$target = document.createElement('header');
    this.$target.classList.add('global-header');
    document.querySelector('#app').appendChild(this.$target);
    globalStore.subscribe('selectedTab', this.render.bind(this));
    globalStore.subscribe('globalState', this.render.bind(this));
    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $homeButton = e.target.closest('.home-button');
      if ($homeButton) {
        globalStore.set('selectedTab', 'detail');
        return;
      }

      const $monthControlButton = e.target.closest('.month-controller > button');
      if ($monthControlButton) {
        const getNewMonth = $monthControlButton.classList.contains('prev-month-button') ? getPrevMonth : getNextMonth;
        const {year, month} = globalStore.get('globalState');
        const {year: newYear, month: newMonth} = getNewMonth({year, month});
        globalStore.set('globalState', {year: newYear, month: newMonth});
        return;
      }

      const $viewTab = e.target.closest('.view-tab');
      if ($viewTab) {
        const {name} = $viewTab.dataset;
        globalStore.set('selectedTab', name);
      }
    });
  }

  render() {
    const selectedTab = globalStore.get('selectedTab');
    const {year, month} = globalStore.get('globalState');
    this.$target.innerHTML = `
    <button class="home-button">우아한 가계부 🧚🏻‍♀️</button>
    <div class="month-controller">
        <button class="prev-month-button">
            <img src="${chevronLeftIcon}" alt="Chevron Left Icon"/>
        </button>
        <div class="year-month-wrapper">
            <p class="month-view">${month}월</p>
            <p class="year-view">${year}년</p>
        </div>
        <button class="next-month-button">
            <img src="${chevronRightIcon}" alt="Chevron Right Icon"/>
        </button>
    </div>
    <ul class="view-tabs-wrapper">
        ${tabData
          .map(
            ({name, icon}) => `<li data-name="${name}" class="view-tab ${selectedTab === name ? 'selected' : ''}">
                <img src="${icon}" alt="${name}-icon"/>
            </li>`,
          )
          .join('')}
    </ul> 
    `;
  }
}
