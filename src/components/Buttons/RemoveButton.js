function RemoveButton(props) {
	const removeTodo = (event) => { props.removeTodo(props.todo) };
	
	return (
		<div className="remove-button">
			<button onClick={removeTodo}>Remove</button>
		</div>
	);
}

export default RemoveButton;
