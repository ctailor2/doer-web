import { Link } from "./api";
import { Todo } from "./todo";

export interface List {
    name: string;
    deferredName: string;
    todos: Todo[];
    deferredTodos: Todo[];
    unlockDuration: number;
    _links: {
        [name: string]: Link;
    };
}
