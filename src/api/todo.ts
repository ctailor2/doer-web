import { Link } from "./api";

export type Todo = TodoForm & TodoLinks;

export interface TodoForm {
    task: string;
}

export interface TodoLinks {
    _links: {
        update: Link;
        delete: Link;
        complete: Link;
        move: Link[];
    };
}
