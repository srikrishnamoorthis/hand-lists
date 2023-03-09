import { useState } from 'react';
import Nav from './nav';
import ListsPage from './lists/index';


const tabs = [
    { key: 'LIST', value: 'Lists' },
    { key: 'CALENDER', value: 'Calender' }
];

function App() {
    const [activeTab, setActivetab] = useState(tabs[0].key);

    const isListTabActive = activeTab === 'LIST';
    // const isCalenderTabActive = activeTab === 'CALENDER';

    return (
        <div className='h-full flex flex-col lg:flex-row'>
            <Nav
                activeTab={activeTab}
                updateTab={setActivetab}
                tabs={tabs}
            />
            {isListTabActive && <ListsPage />}
        </div>
    );
}

export default App;