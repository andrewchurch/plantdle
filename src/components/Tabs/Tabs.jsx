
function Tab({ tabView, tabName, currentView, onChangeView }) {
    const activeClasses = tabView === currentView ? 'bg-blue-500' : '';

    return (
        <li className="">
            <button className={`p-2 ${activeClasses}`} onClick={() => onChangeView(tabView)}>
                {tabName}
            </button>
        </li>
    )
}

function Tabs({ view, onChangeView }) {
    const tabs = [{
        'view': 'stats',
        'name': 'Stats'
    }, {
        'view': 'game',
        'name': 'Home'
    }];

    return (
        <nav className="ml-auto">
            <ul className="flex">
                {tabs.map( (tab, i) => <Tab key={i} tabView={tab.view} tabName={tab.name} currentView={view} onChangeView={onChangeView} /> )}
            </ul>
        </nav>
    )
}

export default Tabs