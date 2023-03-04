// import React, { useReducer } from 'react';
import { ImSearch } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';
import ToDoList from './todoList';

export default function TodoListPane({
	lists,
	addList,
	onChangeListName,
	onSelectListItem
}) {
	return (
		<div className='flex-grow-0 flex-shrink-0 basis-[350px] flex-col h-full'>
			<div className='flex h-[59px] items-center border border-solid border-gray-200'>
				<ImSearch className='mx-3 opacity-40 flex-shrink-0 flex-grow-0' />
				<input
					type='text'
					className='w-full outline-none'
					placeholder='Search' />
				<button className='rounded-full text-white bg-blue-500 ml-3 mr-2 p-1'
					onClick={addList}>
					<FaPlus />
				</button>
			</div>
			<ToDoList 
				lists={lists}
				onChangeListName={onChangeListName}
				onSelectListItem={onSelectListItem}
				/>
		</div>
	);
}