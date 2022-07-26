import GlobalStore from "../../../stores/global.js";
import { padZero } from "../../../utils/date.js";
import { COLORS } from '../../../constants/colors.js';

export default class AccountHistoryStatisticsLineChart {
    constructor({ $parent, model }) {
        this.$target = document.createElement('canvas');
        this.$target.width = $parent.clientWidth;
        this.$target.height = 654;
        this.$target.classList.add('line-chart-canvas');
        this.ctx = this.$target.getContext('2d');
        this.xStart = 42;
        this.yStart = 36;
        this.contentWidth = this.$target.width - this.xStart * 2 - 1;
        this.contentHeight = this.$target.height - this.yStart * 2 - 97;
        this.dx = this.contentWidth / 11;
        this.dy = this.contentHeight / 11;

        $parent.appendChild(this.$target);

        this.model = model;

        this.render();
    }

    drawTitle() {
        const { categoryId } = GlobalStore.get('statisticsState');
        const { categories: { expenditure } } = this.model.getData()
        const { title: categoryTitle } = expenditure.find(v => v.id === categoryId);
        this.ctx.font = '400 24px Noto Sans KR';
        this.ctx.fillStyle = COLORS.TITLE_ACTIVE;
        this.ctx.fillText(`${categoryTitle} 카테고리 소비 추이`, this.xStart, this.yStart + 32)
    }

    drawGridLine({ fromX, fromY, toX, toY }) {
        const halfLineWidth = this.ctx.lineWidth / 2
        this.ctx.moveTo(fromX + halfLineWidth, fromY + halfLineWidth)
        this.ctx.lineTo(toX + halfLineWidth, toY + halfLineWidth)
        this.ctx.stroke()
    }

    drawGrid() {
        let x = this.xStart;
        let y = this.yStart + 60;

        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = '#E4E4E4'

        for (let i = 0; i < 12; i += 1) {
            this.drawGridLine({ fromX: x, fromY: y, toX: x + this.contentWidth, toY: y })
            y += this.dy;
        }

        y = this.yStart + 60;
        for (let i = 0; i < 12; i += 1) {
            this.drawGridLine({ fromX: x, fromY: y, toX: x, toY: y + this.contentHeight })
            x += this.dx;
        }

        this.ctx.closePath()
    }

    drawColumnLabel() {
        const { year, month } = GlobalStore.get('globalState')

        const date = new Date(`${year}.${padZero(month)}.01`)
        date.setMonth(date.getMonth() - 5)
        const startYear = date.getFullYear()
        const startMonth = date.getMonth() + 1

        this.columnData = [...Array(12)].map((_, i) => {
            const month = ((startMonth + i) % 12) || 12;
            const year = (month === 1 && i !== 0) ? startYear + 1 : startYear;
            const yearStart = (i === 0 || (month === 1 && i !== 0));
            return ({
                year,
                yearStart,
                month,
            })
        })

        this.ctx.font = '700 12px Noto Sans KR';
        this.ctx.fillStyle = COLORS.LABEL;
        const dc = this.dx - 0.4;
        this.columnData.forEach(({ month, yearStart, year }, index) => {
            this.ctx.fillText(month, this.xStart + dc * index, this.$target.height - 48)
            if (!yearStart) return;
            this.ctx.fillText(year, this.xStart + dc * index - 8, this.$target.height - 36)
        })
    }

    drawGraph() {
        const { categoryMonthData } = this.model.getData();
        const maxTotal = Math.max(...categoryMonthData.map(({ total }) => total));
        const maxTotalLen = String(maxTotal).length;
        const maxYValue = Math.ceil(maxTotal * (0.1 ** (maxTotalLen - 1))) * (10 ** (maxTotalLen - 1));
        this.ctx.beginPath()
        this.ctx.fillStyle = COLORS.PRIMARY1
        const dots = this.columnData.slice(0, 6).reduce((acc, { month }, index) => {
            const monthData = categoryMonthData.find(v => v.month === month);
            const x = this.xStart + 1 + (this.dx) * index;
            const y = this.yStart + 16 + this.dy * 12 * (monthData ? (1 - monthData.total / maxYValue) : 1);
            this.ctx.moveTo(x, y)
            this.ctx.fillStyle = COLORS.PRIMARY1
            this.ctx.arc(x, y, 4, 0, 2 * Math.PI, true)
            this.ctx.fill()
            acc.push([x, y])
            this.ctx.font = '700 12px Noto Sans KR';
            this.ctx.fillStyle = COLORS.BODY
            this.ctx.fillText((monthData?.total || 0).toLocaleString(), x - 4, y - 12)

            return acc;
        }, [])
        this.ctx.lineWidth = 1
        this.ctx.strokeStyle = COLORS.PRIMARY1
        const prev = [this.xStart + 1, this.yStart + 16 + this.dy * 12]
        dots.forEach(([x, y]) => {
            this.ctx.moveTo(...prev)
            this.ctx.lineTo(x, y);
            this.ctx.stroke()
            prev[0] = x;
            prev[1] = y;
        })

    }

    render() {
        this.drawTitle()
        this.drawGrid()
        this.drawColumnLabel()
        this.drawGraph()
    }
}
