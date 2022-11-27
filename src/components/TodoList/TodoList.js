import TodoItem from "../TodoItem/TodoItem.js";
import TodoAddForm from "../Forms/TodoAddForm.js";

function TodoList(props) {
	return (
		<div className="todo-list">
			<TodoAddForm
				addTodo={props.addTodo}
				todos={props.todos}
				getBase64={props.getBase64}
			/>
			{props.todos.length > 0 &&
				props.todos.map((todo) => (
					<TodoItem
						base64URL={props.base64URL}
						editTodoDescription={props.editTodoDescription}
						editTodoTitle={props.editTodoTitle}
						key={todo.id}
						removeTodo={props.removeTodo}
						todo={todo}
						toggleChecked={props.toggleChecked}
					/>
				))}
		</div>
	);
}

export default TodoList;
