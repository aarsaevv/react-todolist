import { useState } from "react";
import dayjs from "dayjs";
import { IaddTodo, TodoItemProps } from "../../types/types";

function TodoAddForm(props: { id: TodoItemProps["id"]; todos: TodoItemProps[]; addTodo: IaddTodo }) {
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>("");
	const [deadlineTime, setDeadlineTime] = useState<string>("");
	const [file, setFile] = useState<any>();

	/** Асинхронная функция получения base64 из выбранного файла */
	const getBase64Image = async (file: Blob) => {
		const reader = new FileReader();
		await new Promise((resolve, reject) => {
			reader.onload = resolve;
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
		return reader.result;
	};
	/** Добавление в стейт значений название, описание, дедлайн и файл. */
	const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};
	const handleInputDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value);
	};
	const handleInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target as any;
		const image = target.files[0];
		if (image && image.size > 1048487) {
			alert(
				"Файл слишком большой! Он будет некорректно отображаться. Я работаю над улучшением клиентской части и ошибка скоро исчезнет.",
			);
		}
		getBase64Image(image).then((result: any) => setFile(result));
	};
	const handleInputDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeadlineTime(dayjs(event.target.value).unix().toString());
	};
	/** Добавление полей в файл, который позднее будет отправлен в Firestore */
	const addTodo = () => {
		if (title) {
			props.addTodo({
				id: String(props.todos.length + 1),
				creatingTime: dayjs().unix(),
				title,
				description,
				checked: false,
				deadlineTime,
				file,
			});
		} else alert("Название задачи не может быть пустым!");
	};
	/** Очищение полей после клика. Частично работает. */
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		addTodo();
		setDeadlineTime(""); // Не работает
		setDescription("");
		setFile(""); // Не работает
		setTitle("");
	};
	/** То же самое после нажатия Enter в полях */
	const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === "Enter") {
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
				className="add-file"
			/>
			<input
				type="datetime-local"
				id={props.id}
				onBlur={handleInputDate}
				className="add-date"
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
