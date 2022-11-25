import { useState } from "react";

function TaskNameWithCheckbox(props) {
	const [checked, setChecked] = useState(props.todo.checked);

	return (
		<div className="task-name-with-checkbox">
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => {
					setChecked(e.target.checked);
				}}
				className="checkbox"
			/>
			<span className={`${checked ? "striked" : ""}`}>{props.todo.title}</span>
		</div>
	);
}

export default TaskNameWithCheckbox;
