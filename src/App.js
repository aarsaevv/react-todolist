import { useState } from "react";
import "./styles.css";
import Header from "./components/Header/Header.js";
import TodoList from "./components/TodoList/TodoList.js";

function App() {
	let [todos, setTodos] = useState([]);

	const addTodoTitle = (todo) => {
		todos.push(todo);
		setTodos(todos);
		setTodos([...todos]);
	};
	const removeTodo = (todo) => {
		setTodos(todos.filter((el) => todo.id !== el.id));
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
			if (item.message !== todo.message && index + 1 === todo.id) {
				item.message = todo.message;
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
				addTodoTitle={addTodoTitle}
				removeTodo={removeTodo}
				editTodoTitle={editTodoTitle}
				editTodoDescription={editTodoDescription}
				todos={todos}
			/>
		</div>
	);
}

export default App;
