
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
