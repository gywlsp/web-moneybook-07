import globalStore from '../stores/global.js';

import detailIcon from '../assets/file-text.svg';
import calendarIcon from '../assets/calendar.svg';
import chartIcon from '../assets/chart.svg';
import chevronLeftIcon from '../assets/chevron-left.svg';
import chevronRightIcon from '../assets/chevron-right.svg';
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
