export type Todo = {
    id: string;
    text: string;
    completed: boolean;
};

export type TodoListProps = {
    todos: Todo[]
}