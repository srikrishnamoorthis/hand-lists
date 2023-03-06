import TodoListPane from './todoListPane';
import TodoPane from './todoPane';
import { useTodoManager } from './useTodoManager';

function App() {
	const {
		state,
		addList,
		addTodo,
		editTodo,
		editListName,
		onSelectListItem,
		deleteTodo
	} = useTodoManager();

	const selectedList = state.lists && state.lists.find(list => list.id === state.selectedListId);

	return (
		<div className='h-full flex'>
			{/* <div className='bg-gray-200'>Item 1</div> */}
			<TodoListPane
				lists={state.lists}
				addList={addList}
				onChangeListName={editListName}
				onSelectListItem={onSelectListItem}
			/>
			<TodoPane
				list={selectedList}
				onChangeListName={editListName}
				deleteList={() => {}}
				addTodo={addTodo}
				editTodo={editTodo}
				deleteTodo={deleteTodo}
			/>
		</div>
	);
}

export default App;