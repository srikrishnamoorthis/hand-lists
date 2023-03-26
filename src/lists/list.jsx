import _ from 'lodash';
import { useState } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaPlus, FaTrashAlt, FaCheck } from 'react-icons/fa';
import ListItem from './listItem';
// import flowers from '../assets/flowers.jpg';
// import lake from '../assets/lake.jpg';
// import nature from '../assets/nature.jpg';
// import nature2 from '../assets/nature-2.jpg';
// import sand from '../assets/sand.jpg';
// import sunset from '../assets/sunset.jpg';

// const images = [ flowers, nature, nature2, sand, sunset, lake];

export default function List({
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
            <ListItem
                key={todo.id}
                todo={todo}
                onEdit={onEditTodo}
                onDelete={onDeleteTodo} />
        )}
    </ul>

    const completedTodos = list.todos.filter(todo => todo.isCompleted);
    if (isListNil)
        return;
   
    return (
        <div className='h-full'>
            <figure>
                <img src={getImageUrl(list.image)} className='h-40 w-full object-cover' />
            </figure>
            <div className='p-4 mr-4 flex flex-col h-[calc(100%-10rem)]'>
                <div className='flex items-center'>
                    <h1 className='text-4xl font-semibold flex-grow'>{list.name}</h1>
                    <div className='relative'>
                        <button className='bg-gray-200 dark:bg-[#2a3350] rounded-full h-8 w-8'>
                            <GoKebabHorizontal
                                className='m-auto'
                                onClick={() => setShowListOptions(!showListOptions)}
                            />
                        </button>
                        {showListOptions && 
                            <ul className='absolute border border-solid right-2 min-w-[125px] top-5 bg-white dark:bg-[#252D48] dark:border-[#252D48]'>
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
                        className='outline-none flex-grow dark:bg-[#1C2139]'
                        placeholder='New To-Do'
                        onKeyDown={onAddNewTodo}
                    />
                </div>
                {todosMarkup}
                <div className='mt-auto opacity-30'>
                    <FaCheck className='inline-block'/>
                    <span className='ml-2'>{completedTodos.length} to-dos completed</span>
                </div>
            </div>
        </div>
    )
}

function getImageUrl(name) {
  return new URL(`../assets/${name}.jpg`, import.meta.url).href;
}