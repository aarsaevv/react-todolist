import { useState } from "react";

function TodoAddForm(props) {
	const [title, setTitle] = useState("");
	const handleInput = (event) => {
		setTitle(event.target.value);
	};

	const addTodo = (event) => {
		if (title) {
			props.addTodo({
				id: props.todos.length + 1,
				title,
				timestamp: 0,
				hasImageEmbedded: false,
			});
			setTitle("");
		} else {
			alert("Поле не может быть пустым!");
		}
	};

	const handleClick = (event) => {
		addTodo();
	};

	const handleKeypress = (event) => {
		if (event.keyCode === 13) {
			addTodo();
		}
	};

	return (
		<div className="todo-add-form">
			<input
				type="text"
				id={props.id}
				onChange={handleInput}
				className="add-text"
				value={title}
				onKeyDown={handleKeypress}
				placeholder="Введите текст задачи"
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
