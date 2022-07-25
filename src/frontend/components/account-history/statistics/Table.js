import TableHeader from "./TableHeader.js";
import TableRow from "./TableRow.js";

export default class AccountHistoryStatisticsTable {
    constructor({ $parent, model }) {
        this.$target = document.createElement('div');
        this.$target.classList.add('table-wrapper');

        $parent.appendChild(this.$target);
        this.statisticsModel = model;

        this.render();
    }

    render() {
        const { categories: { expenditure } } = this.statisticsModel.getData();
        new TableHeader({ $parent: this.$target, model: this.statisticsModel })
        expenditure.forEach((state) => {
            new TableRow({ $parent: this.$target, model: this.statisticsModel, state })
        })
    }
}