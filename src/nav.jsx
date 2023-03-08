import { ImUser } from 'react-icons/im';
import classnames from 'classnames';

function Nav({
    tabs = [],
    activeTab,
    updateTab
}) {

    return (
        <div className='basis-[200px] flex flex-shrink-0 bg-gray-200'>
            <div className='flex flex-col w-full'>
                <div className='m-4 bg-gray-300 w-10 h-10 rounded-full flex'>
                    <ImUser className='m-auto' />
                </div>
                <ul className='mt-2 flex flex-col'>
                  {tabs.map(tab => (
                    <li 
                        key={tab.key} 
                        className={classnames('px-4 py-2 cursor-pointer hover:bg-gray-300', { 'bg-gray-300': activeTab === tab.key})}
                        onClick={() => updateTab(tab.key)}>
                        {tab.value}
                    </li>
                  ))}
                </ul>
            </div>
            <></>
        </div>
    )
}

export default Nav;
