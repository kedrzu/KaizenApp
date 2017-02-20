
    interface IDictionary<TValue> {
        [index: string]: TValue;
    }

    interface ISample {
        date: moment.Moment;
        value: number;
    }
