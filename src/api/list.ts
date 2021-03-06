import { Link } from "./api";
import { Todo } from "./todo";

export interface List {
    name: string;
    deferredName: string;
    todos: Todo[];
    deferredTodos: Todo[];
    unlockDuration: number;
    _links: {
        createDeferred: Link;
        completed: Link;
        create?: Link;
        unlock?: Link;
        displace?: Link;
        escalate?: Link;
        pull?: Link;
    };
}

export interface ListOption {
    name: string;
    _links: {
        list: Link;
    };
}

export interface ListName {
    name: string;
}

export interface ListAndLink {
    list: List;
    listLink: Link;
}
