import { useState } from "react";

function TodoAddForm(props) {
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	const handleInputTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleInputDescription = (event) => {
		setMessage(event.target.value);
	};
	const addTodoTitle = (event) => {
		if (title) {
			props.addTodoTitle({
				id: props.todos.length + 1,
				title,
				message,
				timestamp: 0,
				hasImageEmbedded: false,
			});
			setTitle("");
		}
		if (message) {
			setMessage("");
		}
	};
	const handleClick = (event) => {
		addTodoTitle();
	};
	const handleKeypress = (event) => {
		if (event.keyCode === 13) {
			addTodoTitle();
		}
	};
	return (
		<div className="todo-add-form">
			<input
				type="text"
				id={props.id}
				onChange={handleInputTitle}
				className="add-text"
				value={title}
				onKeyDown={handleKeypress}
				placeholder="Введите название задачи"
			/>
			<input
				type="text"
				id={props.id}
				onChange={handleInputDescription}
				className="add-text"
				value={message}
				onKeyDown={handleKeypress}
				placeholder="Введите описание задачи"
			/>
			<button
				onClick={handleClick}
				className="add-button">
				+
			</button>
		</div>
	);
}

export default TodoAddForm;
