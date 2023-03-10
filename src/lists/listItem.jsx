import classnames from 'classnames';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function ListItem({
	todo = {},
	onEdit,
	onDelete
}) {
	const [desc, setDesc] = useState(todo.desc);
	const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
	const [hovered, setHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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
        setIsFocused(false);
		onEdit(todo.id, 'desc', value);
	}

	return (
		<li key={todo.id}
			className='flex gap-4 items-center py-2'
			onMouseOver={() => setHovered(true)}
			onMouseOut={() => setHovered(false)}>
			<input 
                type='checkbox'
                className={classnames('rounded-full transition-all duration-1000', { 'opacity-30 line-through': isCompleted})}
				checked={isCompleted}
				onChange={onChangeCheckbox}
			/>
			<input
				type="text"
				className={classnames('outline-none flex-grow dark:bg-[#1C2139] transition-all duration-1000',  { 'opacity-30 line-through': isCompleted})}
				value={desc}
                onFocus={() => setIsFocused(true)}
				onChange={e => onChangeDesc(e)}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
			{
				hovered && !isFocused && <FaTrashAlt
					className='text-red-500 cursor-pointer'
					onClick={() => onDelete(todo.id)} />
			}
		</li>
	);
}