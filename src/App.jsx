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
		deleteTodo,
        deleteList
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
            <div className='border-l border-solid border-gray-400 w-full'>
                <TodoPane
                    list={selectedList}
                    onChangeListName={editListName}
                    deleteList={deleteList}
                    addTodo={addTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
		</div>
	);
}

export default App;