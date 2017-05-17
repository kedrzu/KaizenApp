import { HttpClient } from 'aurelia-fetch-client';
import { buildQueryString } from "aurelia-path";
import * as defs from "./WunderlistApiDefinitions";

const localStorageKey = "Wunderlist-AccessToken";
const clientId = "f0213e52799e3070a4ca";

export class WunderlistClient {

    private accessTokenValue: string;
    private client: HttpClient;

    constructor() {
        this.accessTokenValue = window.localStorage.getItem(localStorageKey);
        this.client = new HttpClient();
        this.configClient();
    }

    private configClient() {
        this.client.configure(config => {
            console.log(this.accessToken, clientId);
            config
                .withBaseUrl("https://a.wunderlist.com/api/v1/")
                .withDefaults({
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "X-Access-Token": this.accessToken,
                        "X-Client-ID": clientId
                    }
                });
        });
    }

    public get accessToken() {
        return this.accessTokenValue || "057c10e2553f3e198fb53e6aeafb8dad63607bd2f70f4bf5c7355734414a";
    }

    public set accessToken(value: string) {
        this.accessTokenValue = value;
        window.localStorage.setItem(localStorageKey, value);
    }

    public getLists(): Promise<defs.ApiTaskList[]> {
        return this.get<defs.ApiTaskList[]>("lists");
    }

    public getTasks(listId: number) : Promise<defs.ApiTask[]> {
        return this.get<defs.ApiTask[]>("tasks", { list_id: listId });
    }

    public getCompletedTasks(listId: number) : Promise<defs.ApiTask[]> {
        return this.get<defs.ApiTask[]>("tasks", { list_id: listId, completed: true });
    }

    private get<T>(resource: string, params?: Object): Promise<T> {
        if (params)
            resource = `${resource}?${buildQueryString(params)}`;

        return this.client.fetch(resource).then(r => r.json() as any);
    }
}
