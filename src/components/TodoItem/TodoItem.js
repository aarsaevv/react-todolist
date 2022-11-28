import TaskTitleWithCheckbox from "../Forms/TaskTitleWithCheckbox.js";
import TaskDescription from "../Forms/TaskDescription.js";
import EditButton from "../Buttons/EditButton.js";
import RemoveButton from "../Buttons/RemoveButton.js";

function TodoItem(props) {
	return (
		<div className="todo-item">
			<TaskTitleWithCheckbox
				todo={props.todo}
				toggleChecked={props.toggleChecked}
			/>
			<TaskDescription
				todo={props.todo}
				toggleChecked={props.toggleChecked}
			/>
			<img
				className={`embedded-image ${props.todo.checked ? "checked" : ""}`}
				src={props.todo.imageSrc || ""}
				alt="Картинка"
			/>
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
