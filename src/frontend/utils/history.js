
export const getHistoryDetailAdderSelects = ($element = document) => {
  const $categorySelect = $element.querySelector('select[name="category"]');
  const $paymentSelect = $element.querySelector('select[name="payment"]');
  return {$categorySelect, $paymentSelect};
};

export const getHistoryDetailAdderInputs = ($element = document) => {
  const $dateStringInput = $element.querySelector('input[name="dateString"]');
  const $descriptionInput = $element.querySelector('input[name="description"]');
  const $priceInput = $element.querySelector('input[name="price"]');
  return {$dateStringInput, $descriptionInput, $priceInput};
};

export const getHistoryDetailAdderItems = ($element = document) => ({
  ...getHistoryDetailAdderInputs($element),
  ...getHistoryDetailAdderSelects($element),
});

const initValue = ($elem, defaultValue) => {
  $elem.dataset.defaultValue = defaultValue;
  $elem.value = defaultValue;
};

export const setHistoryDetailAdderForm = ({id, dateString, categoryId, description, paymentId, price}) => {
  const $historyDetailAdder = document.querySelector('.history-detail-adder');
  $historyDetailAdder.dataset.id = id;
  const {$dateStringInput, $categorySelect, $descriptionInput, $paymentSelect, $priceInput} =
    getHistoryDetailAdderItems($historyDetailAdder);

  initValue($dateStringInput, dateString);
  initValue($categorySelect, categoryId);
  initValue($descriptionInput, description);
  initValue($paymentSelect, paymentId);
  initValue($priceInput, price);
};
