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
            let wins = currentPlayerState.wins;
            let streak = 0;
            let winDate = null;
            if (outcome === 'success') {
                wins++;
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

    const getGameId = () => {
        const msFromStartDay = Date.now() - new Date(2023, 8, 18);
        return Math.floor(msFromStartDay / (24 * 60 * 60 * 1000));
    };

    useEffect(() => {
        localStorage.setItem('player', JSON.stringify(player));
    }, [player]);

    const mainViewComponents = {
        'game': <Game gameId={getGameId()} onChangeView={setView} onGameOver={handleGameOver} />,
        'stats': <Stats onChangeView={setView} player={player} />
    };

    return (
        <div className="h-screen px-2 mx-auto max-w-lg grid grid-rows-[min-content,auto,min-content] md:h-auto md:p-4">
            <Header view={view} onChangeView={setView} />
            <div className="bg-white text-slate-700">
                {mainViewComponents[view]}
            </div>
            <Footer gameId={getGameId()} />
        </div>
    )
}

export default App