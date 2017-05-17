import { inject } from "aurelia-framework";
import * as moment from "moment";

import * as common from "app/common";
import * as helpers from "app/helpers";
import { WunderlistStorage } from "./WunderlistStorage";

@inject(WunderlistStorage)
export class WunderlistMetrics {

    constructor(private storage: WunderlistStorage) { }

    public async getCompletedTasksPerDay(from: moment.Moment, to: moment.Moment): Promise<common.Sample<number>[]> {
        var data = await this.storage.getData();
        var days = helpers.date.days(from, to);

        // prealocate dictionary with count of completed tasks per day
        var tasksPerDay: common.Dictionary<number> = {};
        for (var day of days) {
            tasksPerDay[helpers.date.hash(day)] = 0;
        }

        // count tasks
        for (var list of data.lists) {
            for (var task of list.completedTasks) {
                var hash = helpers.date.hash(task.completedAt);
                tasksPerDay[hash]++;
            }
        }

        // map to result
        return days.map<common.Sample<number>>(d => {
            return {
                timestamp: d,
                value: tasksPerDay[helpers.date.hash(d)]
            }
        });
    }

    public async getBurndown(listIds : number[], from: moment.Moment, to: moment.Moment): Promise<common.Sample<number>[]> {
        var data = await this.storage.getData();
        var days = helpers.date.days(from, to);
        
        var samples = days.map<common.Sample<number>>(d => {
            return {
                timestamp: d,
                value: 0
            }
        });

        for (var list of data.lists.filter(l => listIds.some(id => id === l.id))) {
            for (let task of list.pendingTasks) {
                for (let sample of samples.filter(s => s.timestamp >= task.createdAt)) {
                    sample.value++;
                }
            }

            for (let task of list.completedTasks) {
                for (let sample of samples.filter(s => s.timestamp <= task.completedAt)) {
                    sample.value++;
                }
            }
        }

        return samples;
    }

}
