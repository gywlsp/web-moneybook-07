import minusIcon from '../assets/minus.svg';
import plusIcon from '../assets/plus.svg';

export const updateCategoryTypeToggleBtnIcon = ($toggleBtn, categoryType) => {
  const $toggleIcon = $toggleBtn.querySelector('img');
  const newCategoryType = categoryType || ($toggleIcon.alt === 'minus-icon' ? 'income' : 'expenditure');
  const [newSrc, newAlt] = newCategoryType === 'income' ? [plusIcon, 'plus-icon'] : [minusIcon, 'minus-icon'];
  $toggleIcon.src = newSrc;
  $toggleIcon.alt = newAlt;
};

export const updateCategoryTypeToggleBtn = categoryType => {
  const $toggleBtn = document.querySelector('.category-type-toggleBtn');
  $toggleBtn.dataset.categoryType = categoryType;
  updateCategoryTypeToggleBtnIcon($toggleBtn, categoryType);

  const categoryOptions = [
    ...document.querySelectorAll('.history-detail-adder-select-wrapper.category div.select-item'),
  ];
  categoryOptions.forEach($option => {
    $option.classList.toggle('hidden', $option.dataset.optionType !== categoryType);
  });
};
