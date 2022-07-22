import minusIcon from '../assets/minus.svg';
import plusIcon from '../assets/plus.svg';

export const updateCategoryTypeToggleBtnIcon = ($toggleBtn, categoryType) => {
  const $toggleIcon = $toggleBtn.querySelector('img');
  const newCategoryType = categoryType || ($toggleIcon.alt === 'minus-icon' ? 'income' : 'expenditure');
  const [newSrc, newAlt] = newCategoryType === 'income' ? [plusIcon, 'plus-icon'] : [minusIcon, 'minus-icon'];
  $toggleIcon.src = newSrc;
  $toggleIcon.alt = newAlt;
};
