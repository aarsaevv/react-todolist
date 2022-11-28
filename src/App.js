import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import "./styles.css";
import Header from "./components/Header/Header.js";
import TodoList from "./components/TodoList/TodoList.js";

function App() {
	let [todos, setTodos] = useState([]);

	/** Конфигурация Firebase,
	 * 	Инициализация Cloud и получение ссылки для работы с БД */

	const firebaseConfig = {
		apiKey: "AIzaSyB-lcuq78eO4MQv9kTu9Ys9sV6881QXeDA",
		authDomain: "react-todolist-bc761.firebaseapp.com",
		projectId: "react-todolist-bc761",
		storageBucket: "react-todolist-bc761.appspot.com",
		messagingSenderId: "701744540272",
		appId: "1:701744540272:web:7ef97f060cb3995a2422b5",
	};
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	/** Используется хук useEffect. React загружает тудус после того, как модифицируется DOM-дерево **/
	useEffect(() => {
		loadTodosFromDatabase();
	}, []);
	/** Загрузка тудус через фетч. Правильнее будет сделать это через запрос из библиотеки */
	const loadTodosFromDatabase = async (todo) => {
		fetch(
			"https://firestore.googleapis.com/v1/projects/react-todolist-bc761/databases/(default)/documents/todos"
		)
			.then((response) => response.json())
			.then((json) => {
				if (json.documents) {
					/** Маппинг приходящего из дб JSON и подставление его полей в поля нашего объекта */
					let fields = json.documents.map((document) => {
						return {
							checked: document.fields.checked.booleanValue,
							creatingTime: document.fields.creatingTime.integerValue,
							deadlineTime: document.fields.deadlineTime.integerValue,
							description: document.fields.description.stringValue,
							id: document.name,
							title: document.fields.title.stringValue,
							file: document.fields.file.stringValue,
						};
					});
					/** Сетаем готовый объект в todos */
					setTodos(fields);
				} else setTodos("");
			});
	};
	/** Добавление нового документа в коллекцию todos */
	const addTodo = async (todo) => {
		await addDoc(collection(db, "todos"), todo);
		await loadTodosFromDatabase();
	};
	/** Удаление документа по id из коллекции todos */
	const removeTodo = async (todo) => {
		let realDocumentId = todo.id.slice(-20);
		await deleteDoc(doc(db, "todos", realDocumentId));
		loadTodosFromDatabase();
	};
	/** Переписывание полей объекта приходящими данными - Title и Description */
	const editTodoTitle = async (todo) => {
		if (todo.id) {
			let realDocumentId = todo.id.slice(-20);
			const todoRef = doc(db, "todos", realDocumentId);
			await setDoc(todoRef, { title: todo.title }, { merge: true });
			await loadTodosFromDatabase();
		}
	};
	const editTodoDescription = async (todo) => {
		if (todo.id) {
			let realDocumentId = todo.id.slice(-20);
			const todoRef = doc(db, "todos", realDocumentId);
			await setDoc(todoRef, { description: todo.description }, { merge: true });
			await loadTodosFromDatabase();
		}
	};
	/** Чекинг тудушки и замена на "сделано" при клике */
	const toggleChecked = async (todo) => {
		let realDocumentId = todo.id.slice(-20);
		const todoRef = doc(db, "todos", realDocumentId);
		const todoSnap = await getDoc(todoRef);
		let objectData = todoSnap.data();
		if (objectData.checked === false) {
			await setDoc(todoRef, { checked: true }, { merge: true });
		} else {
			await setDoc(todoRef, { checked: false }, { merge: true });
		}
		await loadTodosFromDatabase();
	};
	return (
		<div className="App">
			<Header />
			<TodoList
				addTodo={addTodo}
				toggleChecked={toggleChecked}
				removeTodo={removeTodo}
				editTodoTitle={editTodoTitle}
				editTodoDescription={editTodoDescription}
				todos={todos}
			/>
		</div>
	);
}

export default App;
