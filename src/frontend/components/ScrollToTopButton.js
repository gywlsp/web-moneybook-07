import CatImage from '../assets/cat.png';
import UpIcon from '../assets/up.svg'
import throttle from "../utils/event.js"

export default class ScrollToTopbutton {
    constructor({ $parent }) {
        this.$target = document.createElement('button');
        this.$target.classList.add("scroll-top-button")

        $parent.appendChild(this.$target);

        this.render();
        this.handleEvent();
    }

    handleEvent() {
        const handleScroll = () => {
            const rootElement = document.documentElement
            const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight

            if ((rootElement.scrollTop / scrollTotal) > 0.10) {
                this.$target.classList.add('show-button')
                return
            }

            this.$target.classList.remove('show-button')
        }

        const DELAY = 100
        const onScroll = throttle(handleScroll, DELAY);
        document.addEventListener('scroll', onScroll)

        this.$target.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }

    render() {
        this.$target.innerHTML = `
        <img src=${UpIcon} alt='up-icon'/>
        <small>맨위로</small>
        <img src=${CatImage} alt='cat-image'/>
    `;
    }
}
