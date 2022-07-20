import './stylesheets/style.css';
import './stylesheets/global.css';

import globalStore from './stores/global.js';

import GlobalHeader from './components/GlobalHeader.js';

const $app = document.createElement('div');
$app.id = 'app';
document.querySelector('body').appendChild($app);

const getSelectedTab = () => {
  const { pathname } = window.location
  if (pathname === '/calendar') return 'calendar';
  if (pathname === '/statistics') return 'statistics'
  return 'detail';
}

const currentDate = new Date();

globalStore.init('selectedTab', getSelectedTab());

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

window.addEventListener("popstate", () => {
  globalStore.set("selectedTab", getSelectedTab())
})

// eslint-disable-next-line no-unused-vars
const globalHeader = new GlobalHeader();
