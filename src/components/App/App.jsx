import { useState } from 'react';
import Header from '../Header/Header.jsx';
import Game from '../Game/Game.jsx';
import Stats from '../Stats/Stats.jsx';
import Footer from '../Footer/Footer.jsx';

const mainViewComponents = {
    'game': <Game />,
    'stats': <Stats />
};

function App() {
    const [view, setView] = useState('game');

    return (
        <div className="md:p-4">
            <div className="mx-auto max-w-5xl">
                <Header view={view} onChangeView={setView} />
                <div className="p-2 bg-white text-slate-700">
                    {mainViewComponents[view]}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default App