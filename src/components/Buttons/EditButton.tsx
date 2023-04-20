import { useState } from "react";
import { IeditTodoDescription, IeditTodoTitle, TodoItemProps } from "../../types/types";

function EditButton(props: {
	todo: TodoItemProps;
	editTodoTitle: IeditTodoTitle;
	editTodoDescription: IeditTodoDescription;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [todoTitle, setTodoTitle] = useState<any>();
	const [todoDescription, setTodoDescription] = useState<any>();

	const handleEditTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		setTodoTitle({
			...todoTitle,
			title: target.value,
			id: props.todo.id,
		});
	};
	const handleEditDescriptionInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		setTodoDescription({
			...todoDescription,
			description: target.value,
			id: props.todo.id,
		});
	};
	const saveTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (isEditing) {
			if (todoTitle || todoDescription) {
				props.editTodoDescription(todoDescription);
				props.editTodoTitle(todoTitle);
			}
		}
	};
	return (
		<div className="edit-button">
			{isEditing && (
				<div>
					<input
						type="text"
						defaultValue={props.todo.title}
						className="edit-text"
						onChange={handleEditTitleInputChange}
					/>
					<input
						type="text"
						defaultValue={props.todo.description}
						className="edit-text"
						onChange={handleEditDescriptionInputChange}
					/>
				</div>
			)}
			<button
				onClick={(event) => {
					setIsEditing(!isEditing);
					saveTodo(event);
				}}>
				{!isEditing ? "Edit" : "Save"}
			</button>
		</div>
	);
}

export default EditButton;
