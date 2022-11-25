import { useState } from "react";

function EditButton(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [todoTitle, setTodoTitle] = useState({});
	const [todoDescription, setTodoDescription] = useState({});

	const handleEditTitleInputChange = (event) => {
		setTodoTitle({
			...todoTitle,
			title: event.target.value,
			id: props.todo.id,
		});
	};

	const handleEditDescriptionInputChange = (event) => {
		setTodoDescription({
			...todoDescription,
			message: event.target.value,
			id: props.todo.id,
		});
	};

	const saveTodo = (event) => {
		if (isEditing) {
			props.editTodoDescription(todoDescription);
			props.editTodoTitle(todoTitle);
		}
	};
	return (
		<div className="edit-button">
			{isEditing && (
				<div>
					<input
						type="text"
						value={todoTitle.value}
						defaultValue={props.todo.title}
						className="edit-text"
						onChange={handleEditTitleInputChange}
					/>
					<input
						type="text"
						value={todoDescription.value}
						defaultValue={props.todo.message}
						className="edit-text"
						onChange={handleEditDescriptionInputChange}
					/>
				</div>
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
