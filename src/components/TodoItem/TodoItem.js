import EditButton from "../Buttons/EditButton.js";
import RemoveButton from "../Buttons/RemoveButton.js";
import TaskDescription from "../Forms/TaskDescription.js";
import TaskNameWithCheckbox from "../Forms/TaskNameWithCheckbox.js";

function TodoItem(props) {
	return (
		<div className="todo-item">
			<TaskNameWithCheckbox todo={props.todo} />
			<TaskDescription todo={props.todo} />
			<div className="item-buttons">
				<EditButton
					todo={props.todo}
					editTodoTitle={props.editTodoTitle}
					editTodoDescription={props.editTodoDescription}
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
