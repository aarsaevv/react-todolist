function TaskTitleWithCheckbox(props) {
	return (
		<div className="task-title-with-checkbox">
			<input
				type="checkbox"
				onChange={() => {
					props.toggleChecked(props.todo);
				}}
				className="checkbox"
				defaultChecked={props.todo.checked ? "checked" : ""}
			/>
			<span
				className={`${props.todo.checked ? "checked" : ""} ${
					props.todo.deadlineTime > 0 &&
					props.todo.creatingTime > props.todo.deadlineTime
						? "deadline-due"
						: ""
				}`}>
				{props.todo.title}
			</span>
		</div>
	);
}

export default TaskTitleWithCheckbox;
