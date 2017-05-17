import { inject } from "aurelia-framework";
import * as moment from "moment";

import { WunderlistClient } from "./WunderlistClient";
import * as api from "./WunderlistApiDefinitions";
import * as models from "./WunderlistModels";


@inject(WunderlistClient)
export class WunderlistStorage {

    constructor(private client: WunderlistClient) { }

    private loaded: Promise<models.StorageData>;

    public getData(): Promise<models.StorageData> {
        if (!this.loaded)
            this.loaded = this.loadData();

        return this.loaded;
    }

    private async loadData(): Promise<models.StorageData> {
        var lists = await this.client.getLists();
        var promises = lists.map(l => this.loadList(l));

        return {
            lists: await Promise.all(promises)
        };
    }

    private async loadList(list: api.ApiTaskList): Promise<models.TaskList> {
        var pendingTasks = await this.client.getTasks(list.id);
        var completedTasks = await this.client.getCompletedTasks(list.id);
        
        return {
            id: list.id,
            name: list.title,
            revision: list.revision,

            completedTasks: completedTasks.map(t => this.mapTask(t)),
            pendingTasks: pendingTasks.map(t => this.mapTask(t))
        };
    }
    
    private mapTask(task: api.ApiTask): models.Task {
        return {
            id: task.id,
            revision: task.revision,
            listId: task.list_id,
            createdAt: moment(task.created_at),
            completed: task.completed,
            completedAt: task.completed ? moment(task.completed_at) : null
        };
    }
}