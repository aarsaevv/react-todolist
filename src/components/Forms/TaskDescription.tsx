import dayjs from "dayjs";
import { TodoItemProps } from "../../types/types";
function TaskDescription(props: { todo: TodoItemProps }) {
	return (
		<div className="task-description">
			<span
				className={`${props.todo.checked ? "checked" : ""} ${
					Number(props.todo.deadlineTime) > 0 && Number(props.todo.creatingTime) > Number(props.todo.deadlineTime)
						? "deadline-due"
						: ""
				}`}>
				{props.todo.description}
				<br />
				{props.todo.deadlineTime ? `До ${dayjs(Number(props.todo.deadlineTime) * 1000).format("DD/MM/YYYY")}` : ""}
			</span>
		</div>
	);
}

export default TaskDescription;
