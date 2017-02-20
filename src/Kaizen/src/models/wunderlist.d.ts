
declare module Wunderlist {

    export interface IEntityBase {
        id: number;
        type: "list" | "task";
        revision: number;
    }

    export interface IEntity extends IEntityBase {
        created_at: string;
        title: string;
    }

    export interface IRoot extends IEntityBase {
        user_id: number;
    }

    export interface ITask extends IEntity {
        created_by_id: number;
        created_by_request_id: string;
        completed: boolean;
        completed_at?: string;
        completed_by_id?: number;
        starred: boolean;
        list_id: number;
        type: "task";
    }

    export interface ITaskList extends IEntity {
        list_type: string;
        owner_id: string;
        owner_type: string;
        public: boolean;
        type: "list";
    }
}