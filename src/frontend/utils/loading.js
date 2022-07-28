export const showLoadingIndicator = () => {
  document.querySelector('.loading-indicator').classList.remove('hidden');
};

export const hideLoadingIndicator = () => {
  document.querySelector('.loading-indicator').classList.add('hidden');
};
