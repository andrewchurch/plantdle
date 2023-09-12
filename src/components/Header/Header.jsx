import Tabs from '../Tabs/Tabs.jsx';

function Header({view, onChangeView}) {

    return (
        <div className="flex px-4">
            <h1 className="pt-1 font-serif font-medium text-2xl tracking-widest uppercase">
                <a href="/">Plantdle</a>
            </h1>
            <Tabs view={view} onChangeView={onChangeView} />
        </div>
    )
}

export default Header