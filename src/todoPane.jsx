import _ from 'lodash';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa'; 

export default function TodoPane({
	list
}) {
	const isListNil = _.isNil(list);

	return (
		<div className='border-l border-solid border-gray-400 p-4 mr-4 w-full'>
			{
				!isListNil &&
				<>
					<div className='flex items-center'>
						<h1 className='text-4xl font-semibold flex-grow'>{list.name}</h1>
						<button className=' bg-gray-200 rounded-full h-8 w-8'>
							<GoKebabHorizontal className='m-auto' />
						</button>
					</div>
					<div className='flex items-center gap-4 mt-6'>
						<FaPlus className='opacity-40'/>
						<input
							type="text"
							className='outline-none'
							placeholder='New To-Do'
							// onChange={}
						/>
					</div>
				</>

			}
		</div>
	)
}
