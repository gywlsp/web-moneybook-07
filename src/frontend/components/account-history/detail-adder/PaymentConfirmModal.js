import AccountHistoryAPI from '../../../api/history.js';

export default class PaymentConfirmModal {
  constructor({$parent, model}) {
    this.$target = document.createElement('div');
    this.$target.className = 'confirm-modal-overlay hidden';

    $parent.appendChild(this.$target);
    this.model = model;
    this.render();
    this.handleEvent();
  }

  async submitForm() {
    const {value} = this.$target.querySelector('#confirm-modal-input');
    const {id} = this.$target.querySelector('.confirm-modal-submit-btn').dataset;
    const submit = () =>
      id === undefined ? AccountHistoryAPI.postPayment({title: value}) : AccountHistoryAPI.deletePayment(id);
    try {
      await submit();
      await this.model.onPaymentMutate();
      this.$target.classList.add('hidden');
    } catch (err) {
      alert(`결제수단 ${id === undefined ? '추가' : '삭제'} 요청이 실패했습니다.`);
    }
  }

  handleEvent() {
    this.$target.addEventListener('click', e => {
      const $modal = e.target.closest('.confirm-modal');
      const $cancelBtn = e.target.closest('.confirm-modal-cancel-btn');
      if (!$modal || $cancelBtn) {
        this.$target.classList.add('hidden');
        return;
      }

      const $submitBtn = e.target.closest('.confirm-modal-submit-btn');
      if ($submitBtn) {
        this.submitForm();
      }
    });

    const $submitBtn = this.$target.querySelector('.confirm-modal-submit-btn');
    this.$target.addEventListener('input', e => {
      const $input = e.target.closest('#confirm-modal-input');
      $submitBtn.disabled = $input?.value === '';
    });
  }

  render() {
    this.$target.innerHTML = `
          <div class="confirm-modal">
              <p class="confirm-modal-title"></p>
              <input id="confirm-modal-input" type="text" placeholder="입력하세요"/>
              <div class="confirm-modal-btns-wrapper">
                  <button class="confirm-modal-cancel-btn">취소</button>
                  <button class="confirm-modal-submit-btn"></button>
              </div>
          </div>
      `;
  }
}
