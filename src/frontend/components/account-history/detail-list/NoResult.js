import GlobalStore from '../../../stores/global.js';

export default class AccountHistoryDetailNoResult {
    constructor({ $parent }) {
        this.$target = document.createElement('p');
        this.$target.classList.add('history-detail-no-result');

        $parent.appendChild(this.$target);
        this.render();
    }

    render() {
        const { year, month } = GlobalStore.get('globalState');
        this.$target.innerText = `${year}년 ${month}월 지출 내역이 없습니다.`;
    }
}