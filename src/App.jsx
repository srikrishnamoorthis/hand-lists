import { useReducer } from 'react';
import { produce } from 'immer';
import TodoListPane from './todoListPane';
import TodoPane from './todoPane';

function App() {
	const [state, dispatch] = useReducer(reducer, {}, initializeState);

	const addList = () => {
		dispatch({ type: types.ADD_LIST_ITEM });
	}

	const onChangeListName = (event, id) => {
		dispatch({ type: types.CHANGE_LIST_NAME, value: event.target.value, id });
	}

	const onSelectListItem = (id) => {
		dispatch({ type: types.SET_SELECTED_LIST, value: id });
	}

	return (
		<div className='h-full flex'>
			{/* <div className='bg-gray-200'>Item 1</div> */}
			<TodoListPane
				lists={state.lists}
				addList={addList}
				onChangeListName={onChangeListName}
				onSelectListItem={onSelectListItem}
			/>
			<TodoPane
				list={state.selectedList}
				onChangeListName={onChangeListName}
				deleteList={() => {}}
				
			/>
		</div>
	);
}

export default App;

const types = {
	ADD_LIST_ITEM: 'ADD_LIST_ITEM',
	CHANGE_LIST_NAME: 'CHANGE_LIST_NAME',
	SET_SELECTED_LIST: 'SET_SELECTED_LIST'
};

function initializeState() {
	return {
		lists: [],
		selectedList: undefined
	}
};

const reducer = produce((draft, action) => {
	switch (action.type) {
		case types.ADD_LIST_ITEM: {
			draft.lists.push(getNewListItem(draft.lists));
			break;
		}

		case types.CHANGE_LIST_NAME: {
			const { value, id} = action;
			const index = draft.lists.findIndex(list => list.id === id);
			draft.lists[index].name = value;
			break;
		}

		case types.SET_SELECTED_LIST: {
			draft.selectedList = draft.lists.find(list => list.id === action.value);
			break;
		}
	}
});

function getNewListItem(lists) {
	const id = getNextAvailableId(lists);
	return { 
		id,
		name: `List #${id}`, 
		todos: [],
		_sortId: lists.length + 1
	}
}

function getNextAvailableId(lists) {
	const existingIds = lists
		.map(list => list.id)
		.sort((a, b) => a - b);

	if (existingIds.length === 0)
		return 1;

	let previousId = 0;
	for (let id of existingIds) {
		if (id - previousId !== 1) {
			return previousId + 1;
		}
		previousId = id;
	}
	return previousId + 1;
}