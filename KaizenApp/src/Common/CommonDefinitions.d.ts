
import * as moment from "moment";

export interface Dictionary<TValue> {
    [index: string]: TValue;
}

export interface Sample<T> {
    timestamp: moment.Moment;
    value: T;
}