
function Tab({ tabProps, currentView, onChangeView }) {
    const activeClasses = tabProps.view === currentView ? 'bg-white text-slate-700' : '';

    return (
        <li className="">
            <button className={`p-2 ${activeClasses}`} onClick={() => onChangeView(tabProps.view)}>
                {tabProps.icon}
                <span className="sr-only">{tabProps.name}</span>
            </button>
        </li>
    )
}

function Tabs({ view, onChangeView }) {
    const tabs = [{
        'view': 'stats',
        'name': 'Stats',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
    }, {
        'view': 'game',
        'name': 'Home',
        'icon': <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    }];

    return (
        <nav className="ml-auto">
            <ul className="flex">
                {tabs.map( (tab, i) => <Tab key={i} tabProps={tab} currentView={view} onChangeView={onChangeView} /> )}
            </ul>
        </nav>
    )
}

export default Tabs