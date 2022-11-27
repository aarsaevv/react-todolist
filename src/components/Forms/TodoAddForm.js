import { useState } from "react";
<<<<<<< Updated upstream
import dayjs from "dayjs";
=======
import dayjs from "dayjs"
import EmbeddedFiles from "./EmbeddedFiles.js";
>>>>>>> Stashed changes

function TodoAddForm(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadlineTime, setDeadlineTime] = useState("");

	const handleInputTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleInputDescription = (event) => {
		setDescription(event.target.value);
	};
	const handleInputDate = (event) => {
		setDeadlineTime(dayjs(event.target.value).unix());
	};
	const addTodo = (event) => {
		if (title) {
			props.addTodo({
				id: props.todos.length + 1,
				creatingTime: dayjs().unix(),
				title,
				description,
				checked: false,
				deadlineTime,
				imageSrc:
					"https://www.html.am/images/samples/remarkables_queenstown_new_zealand-300x225.jpg",
			});
			setTitle("");
		}
		if (description) {
			setDescription("");
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
				value={description}
				onKeyDown={handleKeypress}
				placeholder="Введите описание задачи"
			/>
			<input type="file" />
			<input
				id={props.id}
				type="datetime-local"
				onBlur={handleInputDate}
			/>
			<button
				onClick={handleClick}
				className="add-button">
				Добавить задачу
			</button>
		</div>
	);
}

export default TodoAddForm;
