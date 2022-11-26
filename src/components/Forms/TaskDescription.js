function TaskDescription(props) {
	return (
		<div className="task-description">
			<span className={`${props.todo.checked ? "checked" : ""}`}>
				{props.todo.description}
			</span>
		</div>
	);
}

export default TaskDescription;
