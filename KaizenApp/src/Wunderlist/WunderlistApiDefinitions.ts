export interface ApiEntityBase {
    id: number;
    type: "list" | "task";
    revision: number;
}

export interface ApiEntity extends ApiEntityBase {
    created_at: string;
    title: string;
}

export interface ApiRoot extends ApiEntityBase {
    user_id: number;
}

export interface ApiTask extends ApiEntity {
    created_by_id: number;
    created_by_request_id: string;
    completed: boolean;
    completed_at?: string;
    completed_by_id?: number;
    starred: boolean;
    list_id: number;
    type: "task";
}

export interface ApiTaskList extends ApiEntity {
    list_type: string;
    owner_id: string;
    owner_type: string;
    public: boolean;
    type: "list";
}