import "./styles.css";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import Header from "./components/Header/Header.js";
import TodoList from "./components/TodoList/TodoList.js";

function App() {
	let [todos, setTodos] = useState([]);
	let [base64URL, setBase64URL] = useState("");

	// Firebase Configuration
	const firebaseConfig = {
		apiKey: "AIzaSyB-lcuq78eO4MQv9kTu9Ys9sV6881QXeDA",
		authDomain: "react-todolist-bc761.firebaseapp.com",
		projectId: "react-todolist-bc761",
		storageBucket: "react-todolist-bc761.appspot.com",
		messagingSenderId: "701744540272",
		appId: "1:701744540272:web:7ef97f060cb3995a2422b5",
	};
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	// Initialize Cloud Firestore and get a reference to the service
	const db = getFirestore(app);
	// DONE
	useEffect(() => {
		loadTodosFromDatabase();
	}, []);
	// DONE
	const loadTodosFromDatabase = async (todo) => {
		fetch(
			"https://firestore.googleapis.com/v1/projects/react-todolist-bc761/databases/(default)/documents/todos"
		)
			.then((response) => response.json())
			.then((json) => {
				if (json.documents) {
					let fields = json.documents.map((document) => {
						return {
							checked: document.fields.checked.booleanValue,
							creatingTime: document.fields.creatingTime.integerValue,
							deadlineTime: document.fields.deadlineTime.integerValue,
							description: document.fields.description.stringValue,
							file: document.fields.file.base64URL,
							id: document.name,
							title: document.fields.title.stringValue,
						};
					});
					setTodos(fields);
				} else setTodos("");
			});
	};
	// DONE
	const addTodo = async (todo) => {
		await addDoc(collection(db, "todos"), todo);
		loadTodosFromDatabase();
	};
	// DONE
	const removeTodo = async (todo) => {
		let realDocumentId = todo.id.slice(-20);
		await deleteDoc(doc(db, "todos", realDocumentId));
		loadTodosFromDatabase();
	};
	// DONE
	const editTodoTitle = async (todo) => {
		let realDocumentId = todo.id.slice(-20);
		const todoRef = doc(db, "todos", realDocumentId);
		await setDoc(todoRef, { title: todo.title }, { merge: true });
		await loadTodosFromDatabase();
	};
	// DONE
	const editTodoDescription = async (todo) => {
		let realDocumentId = todo.id.slice(-20);
		const todoRef = doc(db, "todos", realDocumentId);
		await setDoc(todoRef, { description: todo.description }, { merge: true });
		await loadTodosFromDatabase();
	};
	// DONE
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

	const getBase64 = (file) => {
		return new Promise((resolve) => {
			// Make new FileReader
			let reader = new FileReader();
			// Convert the file to base64 text
			reader.readAsDataURL(file);
			// on reader load something...
			reader.onload = () => {
				// Make a fileInfo Object
				base64URL = reader.result;
				resolve(base64URL);
				setBase64URL(base64URL);
			};
		});
	};

	return (
		<div className="App">
			<Header />
			<TodoList
				addTodo={addTodo}
				toggleChecked={toggleChecked}
				getBase64={getBase64}
				removeTodo={removeTodo}
				editTodoTitle={editTodoTitle}
				editTodoDescription={editTodoDescription}
				todos={todos}
				base64URL={base64URL}
			/>
		</div>
	);
}

export default App;
