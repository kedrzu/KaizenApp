var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from "aurelia-framework";
import { TaskJournal } from "../services/TaskJournal";
import { customElement } from "aurelia-framework";
import { select, scaleLinear, scaleBand, max } from "d3";
import * as moment from "moment";
let TasksChart = class TasksChart {
    constructor(journal) {
        this.journal = journal;
        journal.loaded.then(() => this.renderChart());
        window.addEventListener('resize', () => this.renderChart());
    }
    renderChart() {
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
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(this.formatDate(d)))
            .attr("width", x.step())
            .attr("y", d => y(d.value))
            .attr("height", d => height - y(d.value));
    }
    formatDate(sample) {
        return sample.date.format("L");
    }
};
TasksChart = __decorate([
    inject(TaskJournal),
    customElement("app:tasks-chart")
], TasksChart);
export { TasksChart };
