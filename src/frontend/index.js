import './stylesheets/style.css';
import './stylesheets/global.css';

import globalStore from './stores/global.js';

import closeIcon from './assets/closeIcon.svg';
const $app = document.createElement('div');
$app.id = 'app';
document.querySelector('body').appendChild($app);

const currentDate = new Date();

globalStore.init('selectedTab', 'detail');

globalStore.init('globalState', {
  year: currentDate.getFullYear(),
  month: currentDate.getMonth() + 1,
});

globalStore.init('detailState', {
  income: true,
  expenditure: true,
});

globalStore.init('statisticsState', {
  categoryId: null,
});
const $img = document.createElement('img');
$img.src = closeIcon;
document.querySelector('body').appendChild($img);
