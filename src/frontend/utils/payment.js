// eslint-disable-next-line import/prefer-default-export
export const updatePaymentConfirmModal = (actionType, optionData) => {
    const [title, inputValue, inputReadOnly, classNameToBeAdded, classNameToBeRemoved, submitBtnText, submitBtnDisabled] = actionType === "add"
        ? ["추가하실 결제수단을 적어주세요.", '', false, 'add-btn', 'delete-btn', '추가', true]
        : ["해당 결제수단을 삭제하시겠습니까?", optionData.title, true, 'delete-btn', 'add-btn', '삭제', false];

    const $confirmModalOverlay = document.querySelector('.confirm-modal-overlay');
    const $confirmModalTitle = $confirmModalOverlay.querySelector('.confirm-modal-title');
    const $confirmModalInput = $confirmModalOverlay.querySelector('#confirm-modal-input');
    const $confirmModalSubmitBtn = $confirmModalOverlay.querySelector('.confirm-modal-submit-btn');
    $confirmModalTitle.innerText = title;
    $confirmModalInput.value = inputValue;
    $confirmModalInput.readOnly = inputReadOnly;
    $confirmModalSubmitBtn.classList.add(classNameToBeAdded);
    $confirmModalSubmitBtn.classList.remove(classNameToBeRemoved);
    $confirmModalSubmitBtn.innerText = submitBtnText;
    $confirmModalSubmitBtn.disabled = submitBtnDisabled;
    if (actionType === "delete") $confirmModalSubmitBtn.dataset.id = optionData.value;
    $confirmModalOverlay.classList.remove('hidden');
};