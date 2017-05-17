
import * as moment from "moment";

export interface Sample<T> {
    timestamp: moment.Moment;
    value : T;
}