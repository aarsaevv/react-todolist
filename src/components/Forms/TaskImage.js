const TaskImage = (props) => {
	return (
		<img
			className={`embedded-image ${props.todo.checked ? "checked" : ""}`}
			alt="Картинка"
			src={props.todo.file}
		/>
	);
};

export default TaskImage;
