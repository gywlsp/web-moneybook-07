import DonutChart from "./DonutChart.js"
import AccountHistoryStatisticsNoResult from "./NoResult.js";
import Table from "./Table.js"

export default class AccountHistoryStatisticsMainPanel {
    constructor({ $parent, model }) {
        this.$target = document.createElement('div');
        this.$target.classList.add('history-statistics-main-panel');

        $parent.appendChild(this.$target);
        this.statisticsModel = model;

        this.render();
    }

    render() {
        const { categories: { expenditure } } = this.statisticsModel.getData();
        if (!expenditure.length) {
            new AccountHistoryStatisticsNoResult({ $parent: this.$target })
            return;
        }
        new DonutChart({ $parent: this.$target, model: this.statisticsModel });
        new Table({ $parent: this.$target, model: this.statisticsModel });
    }
}