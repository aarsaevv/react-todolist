import TodoItem from "../TodoItem/TodoItem";
import TodoAddForm from "../Forms/TodoAddForm";
import {
	IaddTodo,
	IeditTodoDescription,
	IeditTodoTitle,
	IremoveTodo,
	ItoggleChecked,
	TodoItemProps,
} from "../../types/types";

function TodoList(props: {
	todos: TodoItemProps[];
	addTodo: IaddTodo;
	removeTodo: IremoveTodo;
	toggleChecked: ItoggleChecked;
	editTodoTitle: IeditTodoTitle;
	editTodoDescription: IeditTodoDescription;
}) {
	return (
		<div className="todo-list">
			<TodoAddForm
				id=""
				addTodo={props.addTodo}
				todos={props.todos}
			/>
			{props.todos.length === 0 && (
				<h3>
					Задач нет.
					<br />
					Добавьте задачи.
				</h3>
			)}
			{props.todos.length > 0 &&
				props.todos.map((todo) => (
					<TodoItem
						removeTodo={props.removeTodo}
						toggleChecked={props.toggleChecked}
						editTodoTitle={props.editTodoTitle}
						editTodoDescription={props.editTodoDescription}
						todo={todo}
						key={todo.id}
					/>
				))}
		</div>
	);
}

export default TodoList;
