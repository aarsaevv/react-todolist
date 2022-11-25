// import { useState } from "react";

function TaskDescription(props) {
	return (
		<div className="task-description">
			<span className="">{props.todo.message}</span>
		</div>
	);
}

export default TaskDescription;
