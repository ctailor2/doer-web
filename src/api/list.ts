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
        create?: Link;
        unlock?: Link;
        displace?: Link;
        escalate?: Link;
        pull?: Link;
    };
}
