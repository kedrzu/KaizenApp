import { HttpClient } from 'aurelia-fetch-client';
import { buildQueryString } from "aurelia-path";
const localStorageKey = "Wunderlist-AccessToken";
const clientId = "f0213e52799e3070a4ca";
export class WunderlistApi {
    constructor() {
        this.accessTokenValue = window.localStorage.getItem(localStorageKey);
        this.client = new HttpClient();
        this.configClient();
    }
    configClient() {
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
    get accessToken() {
        return this.accessTokenValue;
    }
    set accessToken(value) {
        this.accessTokenValue = value;
        window.localStorage.setItem(localStorageKey, value);
    }
    getLists() {
        return this.get("lists");
    }
    getTasks(listId) {
        return this.get("tasks", { list_id: listId });
    }
    getCompletedTasks(listId) {
        return this.get("tasks", { list_id: listId, completed: true });
    }
    get(resource, params) {
        if (params)
            resource = `${resource}?${buildQueryString(params)}`;
        return this.client.fetch(resource).then(r => r.json());
    }
}
