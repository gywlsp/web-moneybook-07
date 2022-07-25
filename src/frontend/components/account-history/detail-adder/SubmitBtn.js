import checkIcon from '../../../assets/check.svg';

export default class AccountHistoryDetailAdderSubmitBtn {
  constructor({$parent, model}) {
    this.$target = document.createElement('button');
    this.$target.classList.add('history-detail-adder-submitBtn');
    this.$target.disabled = true;
    $parent.appendChild(this.$target);

    this.model = model;

    this.render();
  }

  render() {
    this.$target.innerHTML = `<img src="${checkIcon}" alt="check-icon" />`;
  }
}
