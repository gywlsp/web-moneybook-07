export default class AccountHistoryDetailAdderInput {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder-select-wrapper');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $selectLabel = e.target.closest('.select-selected');
      const $selectedItems = this.$target.querySelector('.select-items');
      if ($selectLabel) {
        $selectLabel.classList.toggle('select-arrow-active');
        $selectedItems.classList.toggle('select-hide');
        return;
      }

      const $selectItem = e.target.closest('.select-item');
      if ($selectItem) {
        const {optionValue: selectedValue, optionTitle} = $selectItem.dataset;
        const $select = this.$target.querySelector('.history-detail-adder-select');
        $select.value = selectedValue;

        const $selectLabel = this.$target.querySelector('.select-selected');
        $selectLabel.innerHTML = optionTitle;
        $selectLabel.classList.toggle('select-arrow-active');
        $selectLabel.style.color = '#1e2222';

        $selectedItems.classList.add('select-hide');
        [...this.$target.querySelectorAll('.select-item')].forEach($elem => {
          const {optionValue} = $elem.dataset;
          if (optionValue === selectedValue) $elem.classList.add('same-as-selected');
          else $elem.classList.remove('same-as-selected');
        });
      }
    });
  }

  render() {
    const {name} = this.state;
    const {
      categories: {income, expenditure},
    } = this.detailModel.getData();
    const optionData = [...income, ...expenditure].map(({id, title}) => ({value: id, title}));
    this.$target.innerHTML = `
        <select id="${name}" name="${name}" class="history-detail-adder-select">
          ${optionData.map(({value, title}) => `<option value="${value}">${title}</option>`).join('')}
        </select>
        <div class="select-selected">선택하세요</div>
        <div class="select-items select-hide">
          ${optionData
            .map(
              ({value, title}) =>
                `<div class="select-item" data-option-value="${value}"  data-option-title="${title}">${title}</div>`,
            )
            .join('')} 
        </div>
    `;
  }
}
