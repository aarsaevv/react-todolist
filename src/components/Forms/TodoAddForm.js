import { useState } from "react";
import dayjs from "dayjs";

function TodoAddForm(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	let [deadlineTime, setDeadlineTime] = useState("");
	let [file, setFile] = useState("");

	/** Асинхронная функция получения base64 из выбранного файла */
	const getBase64Image = async (file) => {
		const reader = new FileReader();
		await new Promise((resolve, reject) => {
			reader.onload = resolve;
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
		return reader.result;
	};
	/** Добавление в стейт значений название, описание, дедлайн и файл. */
	const handleInputTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleInputDescription = (event) => {
		setDescription(event.target.value);
	};
	const handleInputFile = async (event) => {
		let image = event.target.files[0];
		if (image.size > 1048487) {
			alert(
				"Файл слишком большой! Он будет некорректно отображаться. Я работаю над улучшением клиентской части и ошибка скоро исчезнет."
			);
			event.current.value = "";
		}
		getBase64Image(image).then((result) => setFile(result));
	};
	const handleInputDate = (event) => {
		setDeadlineTime(dayjs(event.target.value).unix());
	};
	/** Добавление полей в файл, который позднее будет отправлен в Firestore */
	const addTodo = (event) => {
		if (title) {
			props.addTodo({
				id: props.todos.length + 1,
				creatingTime: dayjs().unix(),
				title,
				description,
				checked: false,
				deadlineTime,
				file,
			});
		}
	};
	/** Очищение полей после клика. Частично работает. */
	const handleClick = (event) => {
		addTodo();
		setDeadlineTime(""); // Не работает
		setDescription("");
		setFile(""); // Не работает
		setTitle("");
	};
	/** То же самое после нажатия Enter в полях */
	const handleKeypress = (event) => {
		if (event.keyCode === 13) {
			addTodo();
			setDeadlineTime(""); // Не работает
			setDescription("");
			setFile(""); // Не работает
			setTitle("");
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
				onChange={handleInputFile}
			/>
			<input
				type="datetime-local"
				id={props.id}
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
