import { inject } from "aurelia-framework";
import { WunderlistApi } from "../services/WunderlistApi";
import { TaskJournal } from "../services/TaskJournal";
import { customElement } from "aurelia-framework";

export interface IComboboxItem {
    value: any;
    name: any;
}

@inject(WunderlistApi, TaskJournal)
@customElement("app:config")
export class Config {
    constructor(private wunderlistApi: WunderlistApi, private journal : TaskJournal) {

    }
}