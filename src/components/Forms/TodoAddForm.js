import { useState } from "react";
import dayjs from "dayjs";

function TodoAddForm(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [deadlineTime, setDeadlineTime] = useState("");
	let [file, setFile] = useState("");

	const handleInputTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleInputDescription = (event) => {
		setDescription(event.target.value);
	};
	const handleInputDate = (event) => {
		setDeadlineTime(dayjs(event.target.value).unix());
	};
	const handleFileInputChange = (event) => {
		file = event.target.files[0];
		props
			.getBase64(file)
			.then((result) => {
				file["base64"] = result;
				setFile({
					base64URL: result,
					file,
				});
			})
			.catch((err) => {
				console.log(err);
			});
		setFile(file);
	};
	const addTodo = (event) => {
		if (title) {
			props.addTodo({
				checked: false,
				creatingTime: dayjs().unix(),
				deadlineTime,
				description,
				file: file.base64URL,
				id: props.todos.length + 1,
				title,
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
			<input
				type="file"
				name="file"
				onChange={handleFileInputChange}
			/>
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
