
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

@inject(HttpClient)
export class Values {
    values: string[] = ["foo", "bar", "baz", "bams"];

    constructor(private http: HttpClient) { }
    
}