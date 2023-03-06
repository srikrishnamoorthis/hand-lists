import _ from 'lodash';
import { GoKebabHorizontal } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import TodoItem from './todoItem';

export default function TodoPane({
	list,
	addTodo,
	editTodo,
	deleteTodo
}) {
	const isListNil = _.isNil(list);

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
					<div className='flex items-center gap-4 mt-10 mb-4'>
						<FaPlus className='opacity-40' />
						<input
							type="text"
							className='outline-none'
							placeholder='New To-Do'
							onKeyDown={onAddNewTodo}
						/>
					</div>
					{todosMarkup}
				</>

			}
		</div>
	)
}