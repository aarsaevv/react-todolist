export type TodoItemProps = {
	id: string;
	title: string;
	file: string;
	checked: boolean;
	creatingTime: number;
	deadlineTime: string;
	description: string;
};

export interface IaddTodo {
	(todo: TodoItemProps): Promise<void>;
}

export interface IremoveTodo {
	(todo: TodoItemProps): Promise<void>;
}

export interface ItoggleChecked {
	(todo: TodoItemProps): Promise<void>;
}

export interface IeditTodoTitle {
	(todo: TodoItemProps): Promise<void>;
}

export interface IeditTodoDescription {
	(todo: TodoItemProps): Promise<void>;
}
