import { Link } from "./api";
import { Todo } from "./todo";

export interface List {
    profileName: string;
    name: string;
    deferredName: string;
    todos: Todo[];
    deferredTodos: Todo[];
    unlockDuration: number;
    _links: {
        createDeferred: Link;
        create?: Link;
        unlock?: Link;
        displace?: Link;
        escalate?: Link;
        pull?: Link;
    };
}

export interface ListOption {
    name: string;
}

export interface ListForm {
    name: string;
}
