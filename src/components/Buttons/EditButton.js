import { useState } from "react";

function EditButton(props) {
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div className="edit-button">
			{isEditing && (
				<input
					type="text"
					value={props.todo.title}
					className="edit-text"
				/>
			)}
			<button
				onClick={() => {
					setIsEditing(!isEditing);
					if (isEditing) {
						props.editTodo(props.todo);
					}
				}}>
				{!isEditing ? "Edit" : "Save"}
			</button>
		</div>
	);
}

export default EditButton;
