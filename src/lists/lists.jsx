import React from 'react';
import { FaListUl } from 'react-icons/fa';

export default function Lists({
	lists = [],
	onChangeListName,
	onSelectListItem
}) {
	const sortedLists = lists
		.slice()
		.sort((a, b) => b._sortId - a._sortId);

	const onChangeHandler = (e, id) => {
		onChangeListName(id, e.target.value);
	}

	const onKeyDown = (e) => {
		if (e.keyCode === 13)
			e.target.blur();
	}

	return (
		<ul className='overflow-x-auto h-[calc(100%-59px)]'>
			{sortedLists.map((list) => (
				<li key={list.id} 
					className='h-16 border-b border-solid border-gray-200 dark:border-[#252D48] flex p-4 items-center cursor-pointer'
					onClick={(e) => onSelectListItem(list.id)}>
					<FaListUl className='mr-4 text-3xl text-green-500' />
					<input 
						className='flex-grow font-semibold outline-none dark:bg-[#1C2139]'
						type='text'
						value={list.name}
						onChange={(e) => onChangeHandler(e, list.id)}
						onKeyDown={onKeyDown} />
					<span className='justify-self-end opacity-40'>{list.todos.length}</span>
				</li>
			))}
		</ul>
	);
}