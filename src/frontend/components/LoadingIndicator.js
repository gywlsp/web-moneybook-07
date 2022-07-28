import LogoIcon from '../assets/logo.png';

export default class LoadingIndicator {
  constructor({$parent}) {
    this.$target = document.createElement('div');
    this.$target.classList.add('loading-indicator');
    this.$target.classList.add('hidden');
    $parent.appendChild(this.$target);
    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <img src="${LogoIcon}" alt="loading-indicator"/>
    `;
  }
}
