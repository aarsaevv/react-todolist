function TaskTitleWithCheckbox(props) {
	return (
		<div className="task-title-with-checkbox">
			<input
				type="checkbox"
				onChange={() => {
					props.toggleChecked(props.todo);
				}}
				className="checkbox"
			/>
			<span className={`${props.todo.checked ? "checked" : ""}`}>
				{props.todo.title}
			</span>
		</div>
	);
}

export default TaskTitleWithCheckbox;
