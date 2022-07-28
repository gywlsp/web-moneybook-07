/* eslint-disable no-param-reassign */
import AccountHistoryDetailListByDate from './by-date/index.js';
import AccountHistoryDetailListHeader from './header/index.js';

import {updateCategoryTypeToggleBtn} from '../../../utils/category.js';
import {getNumString} from '../../../utils/string.js';
import {setHistoryDetailAdderForm, dispatchInputEventToAdderSelects} from '../../../utils/history.js';

export default class AccountHistoryDetailList {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-list-wrapper');

    $parent.appendChild(this.$target);
    this.model = model;
    this.model.subscribe('payments', this.render.bind(this));
    this.model.subscribe('history', this.render.bind(this));

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $detailRow = e.target.closest('.history-detail-list-by-date-detail');
      if (!$detailRow) return;
      const {id} = $detailRow.dataset;
      const detailId = +id;
      let detailIndex = -1;
      const {dates} = this.model.get('history');
      const dateIndex = dates.findIndex(({details}) => {
        const dIndex = details.findIndex(v => v.id === detailId);
        if (dIndex === -1) return false;
        detailIndex = dIndex;
        return true;
      });

      const {dateString, details} = dates[dateIndex];
      const detail = details[detailIndex];
      const {category, description, payment, price} = detail;

      setHistoryDetailAdderForm({
        id: detailId,
        dateString: getNumString(dateString),
        categoryId: category.id,
        description,
        paymentId: payment.id || '',
        price: price.toLocaleString(),
      });
      updateCategoryTypeToggleBtn(category.type);
      dispatchInputEventToAdderSelects();

      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  render() {
    this.$target.innerHTML = '';
    new AccountHistoryDetailListHeader({$parent: this.$target, model: this.model});
    const {dates} = this.model.get('history');
    dates.forEach(date => {
      new AccountHistoryDetailListByDate({$parent: this.$target, model: this.model, state: {date}});
    });
  }
}
