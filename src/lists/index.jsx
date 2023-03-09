import { useState } from 'react';
import classnames from 'classnames';
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

    // const [showListsPane] = useState(true);

    const selectedList = state.lists && state.lists.find(list => list.id === state.selectedListId);

    return (
        <div className='flex flex-row h-full flex-grow dark:bg-[#1C2139] dark:text-[#F4FAFF]'>
            <div className={classnames('flex-grow-0 flex-shrink-0 basis-[350px]')}>
                <ListsPane
                    lists={state.lists}
                    addList={addList}
                    onChangeListName={editListName}
                    onSelectListItem={onSelectListItem}
                />
            </div>
            <div className='border-l border-solid border-gray-400 dark:border-[#252D48] w-full relative'>
                {/* <div className='absolute top-4 left-4'>arrow</div> */}
                <List
                    list={selectedList}
                    onChangeListName={editListName}
                    deleteList={deleteList}
                    addTodo={addTodo}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>

    )
}
