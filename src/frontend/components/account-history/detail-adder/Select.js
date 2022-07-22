export default class AccountHistoryDetailAdderSelect {
  constructor({$parent, model, state}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('history-detail-adder-select-wrapper');
    $parent.appendChild(this.$target);

    this.detailModel = model;
    this.state = state;
    this.$target.classList.add(this.state.name);

    this.render();
    this.handleEvent();
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $selectLabel = e.target.closest('.select-selected');
      const $selectedItems = this.$target.querySelector('.select-items');
      if ($selectLabel) {
        $selectLabel.classList.toggle('select-arrow-active');
        $selectedItems.classList.toggle('hidden');
        return;
      }

      const $selectItem = e.target.closest('.select-item');
      if ($selectItem) {
        const {optionValue: selectedValue} = $selectItem.dataset;
        const $select = this.$target.querySelector('.history-detail-adder-select');
        $select.value = selectedValue;
        const event = new Event('input', {
          bubbles: true,
        });
        $select.dispatchEvent(event);
      }
    });

    this.$target.addEventListener('input', e => {
      const {value} = e.target;
      const $selectLabel = this.$target.querySelector('.select-selected');
      $selectLabel.classList.remove('select-arrow-active');
      $selectLabel.style.color = '#1e2222';

      const $selectedItems = this.$target.querySelector('.select-items');
      $selectedItems.classList.add('hidden');
      [...this.$target.querySelectorAll('.select-item')].forEach($elem => {
        const {optionValue, optionTitle} = $elem.dataset;
        if (optionValue === value) {
          $elem.classList.add('same-as-selected');
          $selectLabel.innerHTML = optionTitle;
          return;
        }
        $elem.classList.remove('same-as-selected');
      });
    });
  }

  render() {
    const {name} = this.state;
    const {
      categories: {income, expenditure},
      payments,
    } = this.detailModel.getData();
    const options =
      name === 'category'
        ? [...income.map(v => ({...v, type: 'income'})), ...expenditure.map(v => ({...v, type: 'expenditure'}))]
        : payments;
    const optionData = options.map(({id, title, type}) => ({value: id, title, type}));
    this.$target.innerHTML = `
        <select id="${name}" name="${name}" class="history-detail-adder-select">
          ${optionData.map(({value, title}) => `<option value="${value}">${title}</option>`).join('')}
        </select>
        <div class="select-selected">선택하세요</div>
        <div class="select-items hidden">
          ${optionData
            .map(
              ({value, title, type}) =>
                `<div class="select-item ${type === 'income' ? 'hidden' : ''}" ${
                  type ? `data-option-type="${type}"` : ''
                } data-option-value="${value}"  data-option-title="${title}">${title}</div>`,
            )
            .join('')} 
        </div>
    `;
  }
}
