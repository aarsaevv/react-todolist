import EditButton from "../Buttons/EditButton.js";
import RemoveButton from "../Buttons/RemoveButton.js";
import TaskNameWithCheckbox from "../Forms/TaskNameWithCheckbox.js";

function TodoItem(props) {
	return (
		<div className="todo-item">
			<TaskNameWithCheckbox todo={props.todo} />
			<div className="item-buttons">
				<EditButton
					todo={props.todo}
					editTodo={props.editTodo}
				/>
				<RemoveButton
					todo={props.todo}
					removeTodo={props.removeTodo}
				/>
			</div>
		</div>
	);
}

export default TodoItem;
