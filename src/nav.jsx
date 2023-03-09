import { useState } from 'react';
import { ImUser } from 'react-icons/im';
import { FaMoon, FaSun } from 'react-icons/fa';
import classnames from 'classnames';

function Nav({
    tabs = [],
    activeTab,
    updateTab,
}) {
    const [theme, setTheme] = useState('light');

    const changeTheme = () => {
        const newTheme = theme === 'light' ? 'dark': 'light';
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove(theme);
        body.classList.add(newTheme);
        setTheme(newTheme);
    }

    return (
        <div className='flex lg:flex-col lg:basis-[200px] flex-shrink-0 bg-gray-200 justify-between dark:bg-[#252D48] dark:text-[#F4FAFF]'>
            <div className='flex flex-col w-full'>
                <div className='m-4 bg-gray-300 dark:bg-[#121c39] w-10 h-10 rounded-full flex'>
                    <ImUser className='m-auto' />
                </div>
                <ul className='mt-2 flex lg:flex-col'>
                    {tabs.map(tab => (
                        <li
                            key={tab.key}
                            className={classnames('px-4 py-2 cursor-pointer lg:hover:bg-gray-300 dark:lg:hover:bg-[#121c39]', { 'border-b-4 border-solid border-blue-500 lg:border-none lg:bg-gray-300 dark:lg:bg-[#121c39]': activeTab === tab.key })}
                            onClick={() => updateTab(tab.key)}>
                            {tab.value}
                        </li>
                    ))}
                </ul>
            </div>
           {/* Dark mode toggle  */}
            <div className='m-4 flex-shrink-0 mr-4'>
                <label className='inline-block relative cursor-pointer' htmlFor='toggle-btn'>
                    <input id='toggle-btn' type='checkbox' className='sr-only peer' onClick={changeTheme}/>
                    <div className='bg-gray-400 w-12 h-6 rounded-xl peer-checked:bg-blue-500 flex justify-between items-center dark:peer-checked:bg-[#1C2139]'>
                        <FaMoon className='ml-1'/>
                        <FaSun className='mr-1'/>
                    </div>
                    <div className='absolute inset-0 bg-white w-6 h-6 rounded-full transition-all duration-300 peer-checked:translate-x-6'></div>
                </label>
            </div>
        </div>
    )
}

export default Nav;
