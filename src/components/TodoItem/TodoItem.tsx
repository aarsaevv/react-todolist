import TaskTitleWithCheckbox from "../Forms/TaskTitleWithCheckbox";
import TaskDescription from "../Forms/TaskDescription";
import TaskImage from "../Forms/TaskImage";
import EditButton from "../Buttons/EditButton";
import RemoveButton from "../Buttons/RemoveButton";
import { IeditTodoDescription, IremoveTodo, ItoggleChecked, TodoItemProps } from "../../types/types";

function TodoItem(props: {
	todo: TodoItemProps;
	removeTodo: IremoveTodo;
	toggleChecked: ItoggleChecked;
	editTodoTitle: IremoveTodo;
	editTodoDescription: IeditTodoDescription;
}) {
	return (
		<div className="todo-item">
			<TaskTitleWithCheckbox
				todo={props.todo}
				toggleChecked={props.toggleChecked}
			/>
			<TaskDescription todo={props.todo} />
			<TaskImage todo={props.todo} />
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
