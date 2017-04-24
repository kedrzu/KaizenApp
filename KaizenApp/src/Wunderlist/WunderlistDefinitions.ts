export interface EntityBase {
    id: number;
    type: "list" | "task";
    revision: number;
}

export interface Entity extends EntityBase {
    created_at: string;
    title: string;
}

export interface Root extends EntityBase {
    user_id: number;
}

export interface Task extends Entity {
    created_by_id: number;
    created_by_request_id: string;
    completed: boolean;
    completed_at?: string;
    completed_by_id?: number;
    starred: boolean;
    list_id: number;
    type: "task";
}

export interface TaskList extends Entity {
    list_type: string;
    owner_id: string;
    owner_type: string;
    public: boolean;
    type: "list";
}