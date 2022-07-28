import CatImage from '../assets/cat.png';
import UpIcon from '../assets/up.svg'

export default class ScrollToTopbutton {
    constructor({ $parent }) {
        this.$target = document.createElement('div');
        this.$target.classList.add("scroll-top-button")

        $parent.appendChild(this.$target);

        this.render();
        this.handleEvent();
    }

    handleEvent() {
        const throttle = (callback, delay) => {
            let timerId = null;
            return (event) => {
                if (timerId) return;
                timerId = setTimeout(() => {
                    callback(event);
                    timerId = null;
                }, delay);
            };
        };

        const handleScroll = () => {
            const rootElement = document.documentElement
            const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight

            if ((rootElement.scrollTop / scrollTotal) > 0.10) {
                this.$target.classList.add('show-button')
            } else {
                this.$target.classList.remove('show-button')
            }
        }

        const onScroll = throttle(handleScroll, 100);

        document.addEventListener('scroll', onScroll)

        this.$target.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
    }

    render() {
        this.$target.innerHTML = `
        <img src=${UpIcon} alt='up-icon'/>
        <span>맨위로</span>
        <img src=${CatImage} alt='cat-image'/>
    `;
    }
}
