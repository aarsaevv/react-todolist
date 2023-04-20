import { TodoItemProps } from "../../types/types";

const TaskImage = (props: { todo: TodoItemProps }) => {
	return (
		<img
			className={`embedded-image ${props.todo.checked ? "checked" : ""}`}
			alt="Картинка"
			src={props.todo.file}
		/>
	);
};

export default TaskImage;
