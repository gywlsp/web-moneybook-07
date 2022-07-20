import detailIcon from '../assets/file-text.svg';
import calendarIcon from '../assets/calendar.svg';
import chartIcon from '../assets/chart.svg';
import chevronLeftIcon from '../assets/chevron-left.svg';
import chevronRightIcon from '../assets/chevron-right.svg';

export default class GlobalHeader {
  constructor() {
    this.$target = document.createElement('header');
    this.$target.classList.add('global-header');
    document.querySelector('#app').appendChild(this.$target);
    this.render();
  }

  render() {
    this.$target.innerHTML = `
    <button class="home-button">우아한 가계부 🧚🏻‍♀️</button>
    <div class="month-controller">
        <button class="prev-month-button">
            <img src="${chevronLeftIcon}" alt="Chevron Left Icon"/>
        </button>
        <div class="year-month-wrapper">
            <p class="month-view">7월</p>
            <p class="year-view">2021</p>
        </div>
        <button class="next-month-button">
            <img src="${chevronRightIcon}" alt="Chevron Right Icon"/>
        </button>
    </div>
    <ul class="view-tabs-wrapper">
        <li class="view-tab selected">
            <img src="${detailIcon}" alt="Detail Icon"/>
        </li>
        <li class="view-tab">
            <img src="${calendarIcon}" alt="Calendar Icon"/>
        </li>
        <li class="view-tab">
            <img src="${chartIcon}" alt="Chart icon"/>
        </li>
    </ul> 
    `;
  }
}
