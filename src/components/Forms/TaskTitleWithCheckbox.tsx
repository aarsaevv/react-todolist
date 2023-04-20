import { ItoggleChecked, TodoItemProps } from "../../types/types";

function TaskTitleWithCheckbox(props: { todo: TodoItemProps; toggleChecked: ItoggleChecked }) {
	return (
		<div className="task-title-with-checkbox">
			<input
				type="checkbox"
				onChange={() => {
					props.toggleChecked(props.todo);
				}}
				className="checkbox"
				defaultChecked={props.todo.checked ? true : false}
			/>
			<span
				className={`${props.todo.checked ? "checked" : ""} ${
					Number(props.todo.deadlineTime) > 0 && Number(props.todo.creatingTime) > Number(props.todo.deadlineTime)
						? "deadline-due"
						: ""
				}`}>
				{props.todo.title}
			</span>
		</div>
	);
}

export default TaskTitleWithCheckbox;
