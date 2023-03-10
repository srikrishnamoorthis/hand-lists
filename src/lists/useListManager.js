import { useReducer } from 'react';
import { types, reducer, initializeState } from './reducer';

export function useListManager({ initialData }) {
    const [state, dispatch] = useReducer(reducer, { initialData }, initializeState);

    const addList = () => {
        dispatch({ type: types.ADD_LIST });
    }

    const editListName = (id, value) => {
        dispatch({ type: types.CHANGE_LIST_NAME, value, id });
    }

    const onSelectListItem = (id) => {
        dispatch({ type: types.SET_SELECTED_LIST, value: id });
    }

    const addTodo = (listId, value) => {
        dispatch({ type: types.ADD_NEW_TODO, listId, value });
    }

    const editTodo = ({ listId, todoId, field, value }) => {
        dispatch({ type: types.EDIT_TODO, field, value, listId, todoId });
    };

    const deleteTodo = (listId, todoId) => {
        dispatch({ type: types.DELETE_TODO, listId, todoId });
    }

    const deleteList = (listId) => {
        dispatch({ type: types.DELETE_LIST, listId });
    }

    return {
        state,
        addList,
        editListName,
        onSelectListItem,
        addTodo,
        editTodo,
        deleteTodo,
        deleteList
    };
}