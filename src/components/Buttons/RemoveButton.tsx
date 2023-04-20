import { IremoveTodo, TodoItemProps } from "../../types/types";

function RemoveButton(props: { todo: TodoItemProps; removeTodo: IremoveTodo }) {
	const removeTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
		props.removeTodo(props.todo);
	};

	return (
		<div className="remove-button">
			<button onClick={removeTodo}>Remove</button>
		</div>
	);
}

export default RemoveButton;
