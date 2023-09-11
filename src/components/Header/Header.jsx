import Tabs from '../Tabs/Tabs.jsx';

function Header({view, onChangeView}) {

    return (
        <div className="flex">
            <h1>Plantdle</h1>
            <Tabs view={view} onChangeView={onChangeView} />
        </div>
    )
}

export default Header