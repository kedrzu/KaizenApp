import { inject } from "aurelia-framework";
import { TaskJournal } from "../services/TaskJournal";
import { customElement } from "aurelia-framework";
import { select, scaleLinear, scaleBand, max } from "d3";
import * as moment from "moment";

@inject(TaskJournal)
@customElement("app:tasks-chart")
export class TasksChart {

    protected chart: HTMLElement;

    constructor(private journal: TaskJournal) {

        journal.loaded.then(() => this.renderChart());

        window.addEventListener('resize', () => this.renderChart());

    }

    private renderChart() {

        this.chart.innerHTML = null;

        var width = window.innerWidth;
        var height = 600;

        var x = scaleBand().range([0, width]);
        var y = scaleLinear().range([height, 0]);

        var to = moment();
        var from = to.clone().add(-10, "day");

        var data = this.journal.getData(from, to);

        x.domain(data.map(d => this.formatDate(d)));
        y.domain([0, max(data.map(d => d.value))]);

        var svg = select(this.chart)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(this.formatDate(d)))
            .attr("width", x.step())
            .attr("y", d => y(d.value))
            .attr("title", d => d.value)  
            .attr("height", d => height - y(d.value));

        select(this.chart)
            .selectAll('div')
            .data(data)
            .enter()
            .append("div")
            .style('position', 'absolute')
            .style('width', x.step() + 'px')
            .style('text-align', 'center')
            .style('left', d => `${x(this.formatDate(d))}px`)
            .html(d => d.value.toString());
    }

    private formatDate(sample: ISample): string {
        return sample.date.format("L");
    }
}