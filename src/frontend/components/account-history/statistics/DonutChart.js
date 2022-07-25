import {CATEGORY_COLORS} from '../../../constants/category.js';

export default class AccountHistoryStatisticsDonutChart {
  constructor({$parent, model}) {
    this.$target = document.createElement('canvas');
    this.$target.width = 360;
    this.$target.height = 360;
    this.$target.classList.add('donut-chart-canvas');
    this.ctx = this.$target.getContext('2d');

    $parent.appendChild(this.$target);

    this.model = model;

    this.render();
  }

  drawDonutSlice({x, y, radius, startAngle, angle, color}) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.arc(x, y, radius, startAngle, startAngle + angle, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  draw() {
    const {
      categories: {expenditure},
    } = this.model.getData();

    const totalPercentage = expenditure.reduce((acc, {percentage}) => acc + percentage, 0);

    let startAngle = 1.5 * Math.PI;
    expenditure.forEach(({id, percentage}) => {
      const angle = (percentage / totalPercentage) * 2 * Math.PI;
      this.drawDonutSlice({
        x: this.$target.width / 2,
        y: this.$target.height / 2,
        radius: Math.min(this.$target.width / 2, this.$target.height / 2),
        startAngle,
        angle,
        color: CATEGORY_COLORS[id],
      });
      startAngle += angle;
    });

    this.drawDonutSlice({
      x: this.$target.width / 2,
      y: this.$target.height / 2,
      radius: 0.6 * Math.min(this.$target.width / 2, this.$target.height / 2),
      startAngle: 0,
      angle: 2 * Math.PI,
      color: 'white',
    });
  }

  render() {
    this.draw();
  }
}
