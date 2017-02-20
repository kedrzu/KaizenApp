import { inject } from "aurelia-framework";
import { WunderlistApi } from "./WunderlistApi";
import * as moment from "moment";

interface ITaskInfo {
    revision: number;
    date: string;
}

@inject(WunderlistApi)
export class TaskJournal {

    private readonly lists: IDictionary<number> = {};
    private readonly tasks: IDictionary<ITaskInfo> = {};
    private readonly days: IDictionary<number> = {};

    public readonly loaded: Promise<any>;

    constructor(private wunderlistApi: WunderlistApi) {
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

                return Promise.all(promises) as Promise<any>;
            });
    }

    private loadTasks(listId: number) {
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
                    } else {
                        this.days[date]++;
                    }
                }
            });
    }

    public getData(from: moment.Moment, to: moment.Moment): ISample[] {
        var samples: ISample[] = [];

        for (var date = from; date <= to; date.add(1, "day")) {
            var dateStr = this.formatDate(date);
            samples.push({
                date: date.clone(),
                value: this.days[dateStr] || 0
            });
        }

        return samples;
    }

    private formatDate(date: moment.Moment) {
        return date.format("DD-MM-YYYY");
    }
}