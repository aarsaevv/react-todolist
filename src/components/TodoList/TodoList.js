import TodoItem from "../TodoItem/TodoItem.js";
import TodoAddForm from "../Forms/TodoAddForm.js";

function TodoList(props) {
	return (
		<div className="todo-list">
			<TodoAddForm
				addTodoTitle={props.addTodoTitle}
				todos={props.todos}
			/>
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
