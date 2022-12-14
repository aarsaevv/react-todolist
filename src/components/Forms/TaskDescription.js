import dayjs from "dayjs";
function TaskDescription(props) {
	return (
		<div className="task-description">
			<span
				className={`${props.todo.checked ? "checked" : ""} ${
					props.todo.deadlineTime > 0 &&
					props.todo.creatingTime > props.todo.deadlineTime
						? "deadline-due"
						: ""
				}`}>
				{props.todo.description}
				<br />
				{props.todo.deadlineTime
					? `До ${dayjs(props.todo.deadlineTime * 1000).format("DD/MM/YYYY")}`
					: ""}
			</span>
		</div>
	);
}

export default TaskDescription;
