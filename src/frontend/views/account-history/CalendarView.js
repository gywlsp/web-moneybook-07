export default class AccountHistoryCalendarView {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('view-wrapper');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.detailModel.subscribe(this.render.bind(this));

    this.render();
  }

  render() {
    this.$target.innerHTML = '';
  }
}
