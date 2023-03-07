import { produce } from 'immer';
import flowers from '../assets/flowers.jpg';
import lake from '../assets/lake.jpg';
import nature from '../assets/nature.jpg';
import nature2 from '../assets/nature-2.jpg';
import sand from '../assets/sand.jpg';
import sunset from '../assets/sunset.jpg';

const images = [ flowers, nature, nature2, sand, sunset, lake];

function initializeState() {
	return {
		lists: [],
		selectedListId: undefined
	}
};

const types = {
	ADD_LIST: 'ADD_LIST',
	CHANGE_LIST_NAME: 'CHANGE_LIST_NAME',
	SET_SELECTED_LIST: 'SET_SELECTED_LIST',
    DELETE_LIST: 'DELETE_LIST',
	ADD_NEW_TODO: 'ADD_NEW_TODO',
	EDIT_TODO: 'EDIT_TODO',
	DELETE_TODO: 'DELETE_TODO',
};

const todosReducer = produce((draft, action) => {
	switch (action.type) {
		case types.ADD_LIST: {
			draft.lists.push(getNewListItem(draft.lists));
			break;
		}

		case types.CHANGE_LIST_NAME: {
			const { value, id } = action;
			const index = draft.lists.findIndex(list => list.id === id);
			draft.lists[index].name = value;
			break;
		}

		case types.SET_SELECTED_LIST: {
			draft.selectedListId = action.value;
			break;
		}

		case types.ADD_NEW_TODO: {
			const { listId, value } = action;
			const index = findItemIndex(draft.lists, listId);
			const newTodo = getNewTodoItem(draft.lists[index].todos);
			newTodo.desc = value;
			draft.lists[index].todos.push(newTodo);
			break;
		}

        case types.DELETE_LIST: {
            const listIndex = findItemIndex(draft.lists, action.listId);
            draft.lists = [
                ...draft.lists.slice(0, listIndex),
                ...draft.lists.slice(listIndex + 1)
            ];
            break;
        }
        
		case types.EDIT_TODO: {
			const { listId, todoId, field, value } = action;
			const listIndex = findItemIndex(draft.lists, listId);
			const todoIndex = findItemIndex(draft.lists[listIndex].todos, todoId);
			draft.lists[listIndex].todos[todoIndex][field] = value;
			break;
		}

		case types.DELETE_TODO: {
			const { listId, todoId } = action;
			const listIndex = findItemIndex(draft.lists, listId);
			const todoIndex = findItemIndex(draft.lists[listIndex].todos, todoId);
			const oldTodos = draft.lists[listIndex].todos;
			draft.lists[listIndex].todos = [
				...oldTodos.slice(0, todoIndex),
				...oldTodos.slice(todoIndex + 1)
			]
		}
	}
});

export { types, todosReducer, initializeState };

// Private util functions

function findItemIndex(collection, id) {
	return collection.findIndex(item => item.id === id);
}

function getNewListItem(lists) {
	const id = getNextAvailableId(lists);
	return {
		id,
		name: `List #${id}`,
		todos: [],
		_sortId: lists.length + 1,
        image: images[Math.round(Math.random() * 10) % images.length]
	}
}

function getNewTodoItem(todos) {
	return {
		id: getNextAvailableId(todos),
		desc: '',
		isCompleted: false,
		_sortId: todos.length + 1
	};
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