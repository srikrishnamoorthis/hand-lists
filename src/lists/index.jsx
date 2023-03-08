import ListsPane from './listsPane';
import List from './list';
import { useListManager } from './useListManager';

export default function ListsPage() {
    const {
		state,
		addList,
		addTodo,
		editTodo,
		editListName,
		onSelectListItem,
		deleteTodo,
        deleteList
	} = useListManager();

	const selectedList = state.lists && state.lists.find(list => list.id === state.selectedListId);

    return (
        <>
            <ListsPane
                lists={state.lists}
                addList={addList}
                onChangeListName={editListName}
                onSelectListItem={onSelectListItem}
            />
            <div className='border-l border-solid border-gray-400 w-full'>
                <List
                    list={selectedList}
                    onChangeListName={editListName}
                    deleteList={deleteList}
                    addTodo={addTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </>

    )
}
