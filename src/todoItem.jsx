import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function TodoItem({
	todo = {},
	onEdit,
	onDelete
}) {
	const [desc, setDesc] = useState(todo.desc);
	const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
	const [hovered, setHovered] = useState(false);

	const onChangeDesc = (e) => {
		setDesc(e.target.value);
	}

	const onChangeCheckbox = () => {
		setIsCompleted(!isCompleted);
		onEdit(todo.id, 'isCompleted', !isCompleted);
	}

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			const value = e.target.value;
			e.target.blur();
			onEdit(todo.id, 'desc', value);
		}
	}

	const onBlur = (e) => {
		const value = e.target.value;
		e.target.blur();
		onEdit(todo.id, 'desc', value);
	}

	return (
		<li key={todo.id}
			className='flex gap-4 items-center py-2'
			onMouseOver={() => setHovered(true)}
			onMouseOut={() => setHovered(false)}>
			<input type='checkbox'
				checked={isCompleted}
				onChange={onChangeCheckbox}
			/>
			<input
				type="text"
				className='outline-none'
				value={desc}
				onChange={e => onChangeDesc(e)}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
			{
				hovered && <FaTrashAlt
					className='text-red-500 cursor-pointer'
					onClick={() => onDelete(todo.id)} />
			}
		</li>
	);
}