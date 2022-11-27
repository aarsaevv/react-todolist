import { useState } from "react";
import "./styles.css";
import Header from "./components/Header/Header.js";
import TodoList from "./components/TodoList/TodoList.js";

function App() {
	let [todos, setTodos] = useState([]);

<<<<<<< Updated upstream
	const addTodo = (todo) => {
		todos.push(todo);
		setTodos(todos);
		setTodos([...todos]);
	};
	const removeTodo = (todo) => {
		setTodos(todos.filter((el) => todo.id !== el.id));
=======
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

	useEffect(() => {
		loadTodosFromDatabase();
	}, []);

	const loadTodosFromDatabase = async (todo) => {
		const querySnapshot = await getDocs(collection(db, "todos"));
		console.log(querySnapshot.docs[0].id); // Пригодится
		fetch(
			"https://firestore.googleapis.com/v1/projects/react-todolist-bc761/databases/(default)/documents/todos"
		)
			.then((response) => response.json())
			.then((json) => {
				let fields = json.documents.map((document) => {
					return {
						checked: document.fields.checked.booleanValue,
						creatingTime: document.fields.creatingTime.integerValue,
						deadlineTime: document.fields.deadlineTime.integerValue,
						description: document.fields.description.stringValue,
						id: document.name,
						imageSrc: document.fields.imageSrc.stringValue,
						title: document.fields.title.stringValue,
					};
				});
				setTodos(fields);
			});
	};

	const addTodo = async (todo) => {
		await addDoc(collection(db, "todos"), todo);
		loadTodosFromDatabase();
	};
	const removeTodo = async (todo) => {
		// await deleteDoc(doc(db, "todos", todo.id));
		// loadTodosFromDatabase();
>>>>>>> Stashed changes
	};
	const editTodoTitle = (todo) => {
		todos = todos.map((item, index) => {
			if (item.title !== todo.title && index + 1 === todo.id) {
				item.title = todo.title;
				return item;
			}
			return item;
		});
		setTodos(todos);
	};
	const editTodoDescription = (todo) => {
		todos = todos.map((item, index) => {
			if (item.description !== todo.description && index + 1 === todo.id) {
				item.description = todo.description;
				return item;
			}
			return item;
		});
		setTodos(todos);
	};
	const toggleChecked = (todo) => {
		todos = todos.map((item, index) => {
			if (item.checked === todo.checked && index + 1 === todo.id) {
				item.checked = !todo.checked;
				return item;
			}
			return item;
		});
		setTodos(todos);
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
