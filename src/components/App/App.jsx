import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import Game from '../Game/Game.jsx';
import Stats from '../Stats/Stats.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
    const [view, setView] = useState('game');

    const defaultPlayerState = {
        lastWin: null,
        streak: 0,
        wins: 0
    };
    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('player')) || defaultPlayerState);

    const handleGameOver = (outcome) => {
        setPlayer(currentPlayerState => {
            const wins = outcome === 'success' ? currentPlayerState.wins + 1 : currentPlayerState.wins;
            
            let streak = 0;
            let winDate = null;
            if (outcome === 'success') {

                const date = new Date();
                winDate = `${date.getMonth() + 1}/${date.getDate()}`;

                if (currentPlayerState.lastWin) {
                    date.setDate(date.getDate() - 1);
                    if (currentPlayerState.lastWin === `${date.getMonth() + 1}/${date.getDate()}`) {
                        streak = currentPlayerState.streak + 1;
                    }
                }
            }

            return {
                lastWin: winDate,
                wins: wins,
                streak: streak
            }
        });
    };

    const mainViewComponents = {
        'game': <Game onChangeView={setView} onGameOver={handleGameOver} />,
        'stats': <Stats player={player} />
    };

    useEffect(() => {
        localStorage.setItem('player', JSON.stringify(player));
    }, [player]);

    return (
        <div className="px-2 md:p-4">
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