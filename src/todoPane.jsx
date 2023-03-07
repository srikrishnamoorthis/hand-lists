import _ from 'lodash';
import { useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

import TodoItem from './todoItem';

export default function TodoPane({
    list,
    addTodo,
    editTodo,
    deleteTodo,
    deleteList
}) {
    const isListNil = _.isNil(list);
    const [showListOptions, setShowListOptions] = useState();

    const onAddNewTodo = (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value;
            e.target.blur();
            e.target.value = '';
            addTodo(list.id, value);
        }
    };

    const onEditTodo = (todoId, field, value) => {
        editTodo({ listId: list.id, todoId, field, value });
    };

    const onDeleteTodo = (todoId) => {
        deleteTodo(list.id, todoId);
    }

    const onDeleteList = () => {
        setShowListOptions(false);
        deleteList(list.id);
    }

    const sortedTodos = list?.todos
        .slice()
        .sort((a, b) => b._sortId - a._sortId) || [];

    const todosMarkup = <ul>
        {sortedTodos.map(todo =>
            <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo} />
        )}
    </ul>

    if (isListNil)
        return;

    return (
        <div className=''>
            <figure>
                <img src={list.image} className='h-40 w-full object-cover' />
            </figure>
            <div className='p-4 mr-4'>
                <div className='flex items-center'>
                    <h1 className='text-4xl font-semibold flex-grow'>{list.name}</h1>
                    <div className='relative'>
                        <button className='bg-gray-200 rounded-full h-8 w-8'>
                            <GoKebabHorizontal
                                className='m-auto'
                                onClick={() => setShowListOptions(!showListOptions)}
                            />
                        </button>
                        {showListOptions && 
                            <ul className='absolute border border-solid right-2 min-w-[125px] top-5 bg-white'>
                                <li className='px-2 py-2 cursor-pointer flex gap-2 items-center'
                                    onClick={onDeleteList}>
                                    <FaTrashAlt className='text-red-500'/>
                                    Delete
                                </li>
                            </ul>}
                    </div>
                </div>
                <div className='flex items-center gap-4 mt-10 mb-4'>
                    <FaPlus className='opacity-40' />
                    <input
                        type="text"
                        className='outline-none flex-grow'
                        placeholder='New To-Do'
                        onKeyDown={onAddNewTodo}
                    />
                </div>
                {todosMarkup}
            </div>
        </div>
    )
}