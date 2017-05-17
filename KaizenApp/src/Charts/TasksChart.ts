import { inject } from "aurelia-framework";
import { customElement } from "aurelia-framework";
import { select, scaleLinear, scaleBand, max } from "d3";
import * as moment from "moment";

import * as common from "app/common";
import { WunderlistMetrics } from "app/wunderlist";

@inject(WunderlistMetrics)
@customElement("app:tasks-chart")
export class TasksChart {

    protected chart: HTMLElement;

    private samples : common.Sample<number>[];

    constructor(private metrics: WunderlistMetrics) {
        this.initialize();
    }

    private async initialize() {
        var to = moment();
        var from = to.clone().add(-10, "day");

        //this.samples = await this.metrics.getCompletedTasksPerDay(from, to);
        this.samples = await this.metrics.getBurndown([155141052, 302645324], from, to);

        this.renderChart();
        $(window).on('resize', () => this.renderChart());
    }

    private renderChart() {

        this.chart.innerHTML = null;

        var width = window.innerWidth;
        var height = 600;

        var x = scaleBand().range([0, width]);
        var y = scaleLinear().range([height, 0]);
        
        x.domain(this.samples.map(d => this.formatDate(d)));
        y.domain([0, max(this.samples.map(d => d.value))]);

        var svg = select(this.chart)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll(".bar")
            .data(this.samples)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(this.formatDate(d)))
            .attr("width", x.step() * 0.8)
            .attr("y", d => y(d.value))
            .attr("title", d => d.value)
            .attr("height", d => height - y(d.value));

        select(this.chart)
            .selectAll('div')
            .data(this.samples)
            .enter()
            .append("div")
            .style('position', 'absolute')
            .style('width', x.step() + 'px')
            .style('text-align', 'center')
            .style('left', d => `${x(this.formatDate(d))}px`)
            .html(d => d.value.toString());
    }

    private formatDate(sample: common.Sample<number>): string {
        return sample.timestamp.format("L");
    }
}