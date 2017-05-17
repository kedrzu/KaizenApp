
import * as moment from "moment";

export module date {
    
    export function days(from: moment.Moment, to: moment.Moment): moment.Moment[] {
        var days: moment.Moment[] = [];
        for (var date = from; date <= to; date.add(1, "day")) {
            days.push(date.clone());
        }

        return days;
    }

    export function hash(date : moment.Moment) {
        return date.format("DD-MM-YYYY");
    }
    
}
