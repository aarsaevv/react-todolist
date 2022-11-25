import TodoItem from "../TodoItem/TodoItem.js";
import TodoAddForm from "../Buttons/TodoAddForm.js";

function TodoList(props) {
	return (
		<div className="todo-list">
			<TodoAddForm addTodo={props.addTodo} todos={props.todos} />

			{props.todos.length > 0 &&
				props.todos.map((todo) => (
					<TodoItem
						removeTodo={props.removeTodo}
						editTodo={props.editTodo}
						todo={todo}
						key={todo.id}
					/>
				))}
		</div>
	);
}

export default TodoList;
