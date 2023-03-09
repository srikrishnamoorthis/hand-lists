import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';
import Lists from './lists';
import _ from 'lodash';

export default function ListsPane({
	lists,
	addList,
	onChangeListName,
	onSelectListItem
}) {
	const [filterText, setFilterText] = useState('');

	const filteredList = lists?.filter(item => item?.name.toLowerCase().includes(filterText.toLowerCase()));

	const onChangeSearch = (e) => {
		setFilterText(e.target.value);
	};
	
	return (
		<div className='flex-col h-full'>
			<div className='flex h-[59px] items-center border border-solid border-gray-200 dark:border-[#252D48]'>
				<ImSearch className='mx-3 opacity-40 flex-shrink-0 flex-grow-0' />
				<input
					type='text'
					className='w-full outline-none dark:bg-[#1C2139]'
					placeholder='Search'
					value={filterText}
					onChange={onChangeSearch} />
				<button className='rounded-full text-white bg-blue-500 dark:bg-[#323b5b] ml-3 mr-2 p-1'
					onClick={addList}>
					<FaPlus />
				</button>
			</div>
			<Lists 
				lists={filteredList}
				onChangeListName={onChangeListName}
				onSelectListItem={onSelectListItem}
				/>
		</div>
	);
}