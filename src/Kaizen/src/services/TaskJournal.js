var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from "aurelia-framework";
import { WunderlistApi } from "./WunderlistApi";
import * as moment from "moment";
let TaskJournal = class TaskJournal {
    constructor(wunderlistApi) {
        this.wunderlistApi = wunderlistApi;
        this.lists = {};
        this.tasks = {};
        this.days = {};
        this.loaded = this.wunderlistApi
            .getLists()
            .then(lists => {
            for (let list of lists) {
                this.lists[list.id] = list.revision;
            }
            var promises = lists.map(list => {
                this.lists[list.id] = list.revision;
                return this.loadTasks(list.id).then(() => console.log(this.days));
            });
            return Promise.all(promises);
        });
    }
    loadTasks(listId) {
        return this.wunderlistApi
            .getCompletedTasks(listId)
            .then(tasks => {
            // zapisujemy informacje o taskach
            for (let task of tasks) {
                var date = this.formatDate(moment(task.completed_at));
                this.tasks[task.id] = {
                    revision: task.revision,
                    date: date
                };
                if (this.days.hasOwnProperty(date) === false) {
                    this.days[date] = 1;
                }
                else {
                    this.days[date]++;
                }
            }
        });
    }
    getData(from, to) {
        var samples = [];
        for (var date = from; date <= to; date.add(1, "day")) {
            var dateStr = this.formatDate(date);
            samples.push({
                date: date.clone(),
                value: this.days[dateStr] || 0
            });
        }
        return samples;
    }
    formatDate(date) {
        return date.format("DD-MM-YYYY");
    }
};
TaskJournal = __decorate([
    inject(WunderlistApi)
], TaskJournal);
export { TaskJournal };
