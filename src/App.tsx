import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { SnapshotOptions, getFirestore } from "firebase/firestore";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import "./styles.scss";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import {
	IaddTodo,
	IeditTodoDescription,
	IeditTodoTitle,
	IremoveTodo,
	ItoggleChecked,
	TodoItemProps,
} from "./types/types";

function App() {
	let [todos, setTodos] = useState<TodoItemProps[]>([]);

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

	let retrievedArrayOfDocs: any[] = [];
	let retrievedArrayOfIDs: string[] = [];

	const loadTodosFromDatabase = async () => {
		const querySnapshot = await getDocs(collection(db, "todos"));
		if (querySnapshot) {
			querySnapshot.forEach((doc: { id: string; data(): SnapshotOptions }) => {
				retrievedArrayOfIDs.push(doc.id);
				retrievedArrayOfDocs.push(doc.data());
			});
			retrievedArrayOfDocs.map((document, index) => {
				document.id = retrievedArrayOfIDs[index];
				return document.id;
			});

			/** Полученные тудус сортируются в порядке создания **/
			retrievedArrayOfDocs.sort((prev, next) => next.creatingTime - prev.creatingTime);
			setTodos(retrievedArrayOfDocs);
		} else {
			setTodos([]);
		}
	};

	/** Добавление нового документа в коллекцию todos */
	const addTodo: IaddTodo = async (todo: TodoItemProps) => {
		await addDoc(collection(db, "todos"), todo);
		loadTodosFromDatabase();
	};

	/** Удаление документа по id из коллекции todos */
	const removeTodo: IremoveTodo = async (todo: TodoItemProps) => {
		await deleteDoc(doc(db, "todos", todo.id));
		loadTodosFromDatabase();
	};

	/** Переписывание полей объекта приходящими данными - Title и Description */
	const editTodoTitle: IeditTodoTitle = async (todo: TodoItemProps) => {
		if (todo.id) {
			const todoRef = doc(db, "todos", todo.id);
			await setDoc(todoRef, { title: todo.title }, { merge: true });
			loadTodosFromDatabase();
		}
	};
	const editTodoDescription: IeditTodoDescription = async (todo: TodoItemProps) => {
		if (todo.id) {
			const todoRef = doc(db, "todos", todo.id);
			await setDoc(todoRef, { description: todo.description }, { merge: true });
			await loadTodosFromDatabase();
		}
	};

	/** Чекинг тудушки и замена на "сделано" при клике */
	const toggleChecked: ItoggleChecked = async (todo: TodoItemProps) => {
		const todoRef = doc(db, "todos", todo.id);
		const todoSnap = await getDoc(todoRef);
		let objectData = todoSnap.data();
		if (objectData && objectData.checked === false) {
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
