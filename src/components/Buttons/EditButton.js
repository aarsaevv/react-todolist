import { useState } from "react";

function EditButton(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [todo, setTodo] = useState({});

	const handleEditInputChange = (event) => {
		setTodo({ ...todo, title: event.target.value, id: props.todo.id });
	};
	const saveTodo = (event) => {
		if (isEditing) {
			props.editTodo(todo);
		}
	};
	return (
		<div className="edit-button">
			{isEditing && (
				<input
					type="text"
					value={todo.value}
					defaultValue={props.todo.title}
					className="edit-text"
					onChange={handleEditInputChange}
				/>
			)}
			<button
				onClick={() => {
					setIsEditing(!isEditing);
					saveTodo();
				}}>
				{!isEditing ? "Edit" : "Save"}
			</button>
		</div>
	);
}

export default EditButton;
