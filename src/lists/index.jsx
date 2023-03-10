import { useState } from 'react';
import _ from 'lodash';
import { FaAngleLeft } from 'react-icons/fa';
import classnames from 'classnames';
import ListsPane from './listsPane';
import List from './list';
import { useListManager } from './useListManager';
import { useOnWindowResize } from '../common/useOnWindowResize';
import localData from '../local-data.json';

export default function ListsPage() {
    const {
        state,
        addList,
        addTodo,
        editTodo,
        editListName,
        onSelectListItem: _onSelectListItem,
        deleteTodo,
        deleteList
    } = useListManager({ initialData: localData });

    const [width, setWidth] = useState(window.innerWidth);
    const [prevWidth, setPrevWidth] = useState(width);
    const isMobileView = width <= 648;

    useOnWindowResize(() => {
        setWidth(window.innerWidth);
    });

    const [hideListsPaneInMobileView, setHideListPaneInMobileView] = useState(!_.isNil(state.selectedListId));
    if (prevWidth !== width) {
        setPrevWidth(width);
        // Reset flag
        setHideListPaneInMobileView(true);
    }

    const onSelectListItem = (...args) => {
        setHideListPaneInMobileView(true);
        _onSelectListItem(...args);
    }

    const selectedList = state.lists && state.lists.find(list => list.id === state.selectedListId);

    return (
        <div className='flex flex-row h-full flex-grow dark:bg-[#1C2139] dark:text-[#F4FAFF]'>
            {(!isMobileView || !hideListsPaneInMobileView) &&
                <div className={classnames('md:flex-grow-0 md:flex-shrink-0 md:basis-[350px] basis-full')}>
                    <ListsPane
                        lists={state.lists}
                        addList={addList}
                        onChangeListName={editListName}
                        onSelectListItem={onSelectListItem}
                    />
                </div>
            }
            {(!isMobileView || hideListsPaneInMobileView) &&
                <div className='border-l border-solid border-gray-400 dark:border-[#252D48] w-full relative'>
                    {isMobileView &&
                        <div className='absolute top-4 left-4 cursor-pointer'
                            onClick={() => setHideListPaneInMobileView(false)}>
                            <FaAngleLeft className='text-white text-3xl' />
                        </div>
                    }
                    <List
                        list={selectedList}
                        onChangeListName={editListName}
                        deleteList={deleteList}
                        addTodo={addTodo}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                    />
                </div>
            }

        </div>
    );
}