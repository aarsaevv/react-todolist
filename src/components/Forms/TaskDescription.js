function TaskDescription(props) {
	return (
		<div className="task-description">
			<span
				className={`${props.todo.checked ? "checked" : ""} ${
					props.todo.creatingTime > props.todo.deadlineTime
						? "deadline-due"
						: ""
				}`}>
				{props.todo.description}
			</span>
		</div>
	);
}

export default TaskDescription;
