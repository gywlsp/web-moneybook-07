import GlobalStore from "../../../stores/global.js";
import { getDateString } from "../../../utils/date.js";
import { COLORS } from '../../../constants/colors.js';
import { ceil } from "../../../utils/number.js";

export default class AccountHistoryStatisticsLineChart {
    constructor({ $parent, model }) {
        this.$target = document.createElement('canvas');
        this.$target.width = $parent.clientWidth;
        this.$target.height = 654;
        this.$target.classList.add('line-chart-canvas');
        $parent.appendChild(this.$target);
        this.ctx = this.$target.getContext('2d');
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 1;
        this.xStart = 42;
        this.yStart = 36;
        this.titleHeight = 60;
        this.gridYStart = this.yStart + this.titleHeight;
        this.contentWidth = this.$target.width - this.xStart * 2 - 1;
        this.gridHeight = this.$target.height - this.yStart * 2 - 97;
        this.lineCnt = 12;
        this.dx = this.contentWidth / (this.lineCnt - 1);
        this.dy = this.gridHeight / (this.lineCnt - 1);

        this.model = model;

        this.render();
    }

    drawText({ fontWeight = 400, fontSize = '12px', color = COLORS.TITLE_ACTIVE, value, x, y }) {
        this.ctx.font = `${fontWeight} ${fontSize} Noto Sans KR`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(value, x, y)
    }

    drawTitle() {
        const { categoryId } = GlobalStore.get('statisticsState');
        const { categories: { expenditure } } = this.model.getData()
        const { title: categoryTitle } = expenditure.find(v => v.id === categoryId);
        this.drawText({ fontSize: '24px', value: `${categoryTitle} 카테고리 소비 추이`, x: this.xStart, y: this.yStart })
    }

    drawStrokePath({ drawPath, color = COLORS.BACKGROUND }) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = color
        drawPath()
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawDot({ color = COLORS.PRIMARY1, x, y, radius }) {
        this.ctx.beginPath()
        this.ctx.fillStyle = color
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        this.ctx.fill()
        this.ctx.closePath()
    }

    drawGridLine({ fromX, fromY, toX, toY }) {
        const halfLineWidth = this.ctx.lineWidth / 2
        this.ctx.moveTo(fromX + halfLineWidth, fromY + halfLineWidth)
        this.ctx.lineTo(toX + halfLineWidth, toY + halfLineWidth)
    }

    drawGridRows() {
        const x = this.xStart;
        let y = this.gridYStart;
        for (let i = 0; i < this.lineCnt; i += 1) {
            this.drawGridLine({ fromX: x, fromY: y, toX: x + this.contentWidth, toY: y })
            y += this.dy;
        }
    }

    drawGridColumns() {
        let x = this.xStart;
        const y = this.gridYStart;
        for (let i = 0; i < this.lineCnt; i += 1) {
            this.drawGridLine({ fromX: x, fromY: y, toX: x, toY: y + this.gridHeight })
            x += this.dx;
        }
    }

    drawGrid() {
        this.drawStrokePath({
            drawPath: () => {
                this.drawGridRows();
                this.drawGridColumns();
            }
        })
    }

    drawColumnLabel() {
        const { year, month } = GlobalStore.get('globalState')
        const date = new Date(getDateString({ year, month, date: 1 }))
        date.setMonth(date.getMonth() - 5)
        const startYear = date.getFullYear()
        const startMonth = date.getMonth() + 1

        const TOTAL_MONTH = 12;
        this.columnData = [...Array(this.lineCnt)].map((_, i) => {
            const month = ((startMonth + i) % TOTAL_MONTH) || TOTAL_MONTH;
            const newYear = (month === 1 && i !== 0)
            const year = newYear ? startYear + 1 : startYear;
            const firstMonth = (i === 0 || newYear);
            return ({
                year,
                firstMonth,
                month,
            })
        })

        const dc = this.dx - 0.5 * this.ctx.lineWidth;
        this.columnData.forEach(({ month, firstMonth, year }, index) => {
            this.drawText({ fontWeight: 700, color: COLORS.LABEL, value: month, x: this.xStart + dc * index, y: this.gridYStart + this.gridHeight + 12 })
            if (!firstMonth) return;
            this.drawText({ fontWeight: 500, color: COLORS.PRIMARY2, value: year, x: this.xStart + dc * index - 8, y: this.gridYStart + this.gridHeight + 24 })
        })
    }

    drawGraph() {
        const { categoryMonthData } = this.model.getData();
        const maxTotal = Math.max(...categoryMonthData.map(({ total }) => total));
        const digit = String(maxTotal).length - 1;
        const maxYValue = ceil(maxTotal, digit);
        const dots = this.columnData.slice(0, 6).reduce((acc, { month }, index) => {
            const currMonthData = categoryMonthData.find(v => v.month === month);
            const x = this.xStart + this.ctx.lineWidth + (this.dx) * index;
            const y = this.gridYStart + this.gridHeight * (currMonthData ? (1 - currMonthData.total / maxYValue) : 1);
            this.drawDot({ x, y, radius: 4 })
            this.drawText({ fontWeight: 700, color: COLORS.BODY, value: (currMonthData?.total || 0).toLocaleString(), x: x - 4, y: y - 20 })
            acc.push([x, y])
            return acc;
        }, [])
        dots.reduce((prev, curr) => {
            this.drawStrokePath({
                color: COLORS.PRIMARY1,
                drawPath: () => {
                    this.ctx.moveTo(...prev)
                    this.ctx.lineTo(...curr);
                }
            })
            return curr;
        }, [this.xStart + this.ctx.lineWidth, this.gridYStart + this.gridHeight])

    }

    render() {
        this.drawTitle()
        this.drawGrid()
        this.drawColumnLabel()
        this.drawGraph()
    }
}
