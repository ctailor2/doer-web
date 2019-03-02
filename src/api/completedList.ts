export interface CompletedList {
    todos: CompletedTodo[];
}

export interface CompletedTodo {
    task: string;
    completedAt: string;
}
