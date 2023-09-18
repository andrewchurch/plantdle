import { useState, useEffect } from 'react';
import { getAll, getGameData } from '../../services/data.mjs';
import Clues from './Clues/Clues.jsx';
import Guesser from './Guesser/Guesser.jsx';
import Guess from './Guess/Guess.jsx';

function Game({ onChangeView, onGameOver }) {
    const totalGuessesAllowed = 4;

    const [isLoading, setLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState({});

    const defaultGameState = {
        status: null,
        outcome: null,
        activeClue: 0,
        guesses: []
    };
    const [game, setGame] = useState(JSON.parse(localStorage.getItem('game')) || defaultGameState);

    const checkGuess = (guessId) => {
        return guessId === gameInfo.answerId;
    }

    const setActiveClue = (clue) => {
        setGame(currentGameState => {
            return {
                ...currentGameState,
                activeClue: clue
            }
        });
    }

    const handleGuess = (guessId, guessLabel) => {

        setGame(currentGameState => {
            let updatedGameState = {
                ...currentGameState,
                guesses: [...currentGameState.guesses]
            };

            const isCorrectGuess = checkGuess(guessId);

            updatedGameState.guesses.unshift({
                guess: guessLabel,
                outcome: isCorrectGuess ? 'success' : 'failure'
            });

            if (isCorrectGuess) {
                updatedGameState.status = 'finished';
                updatedGameState.outcome = 'success';

                // update player stats
                onGameOver('success');

            } else {

                // if this was last guess the game is over
                if ((currentGameState.guesses.length + 1) === totalGuessesAllowed) {
                    updatedGameState.status = 'finished';
                    updatedGameState.outcome = 'failure';

                    // update player stats
                    onGameOver('failure');

                    // not the last guess change active clue
                } else {
                    updatedGameState.activeClue = currentGameState.guesses.length + 1;
                }
            }

            return updatedGameState;
        });
    };

    const fetchData = async () => {
        setLoading(true);

        setGameInfo({
            gameId: 1,
            answerId: 1,
            visuals: [
                {
                    'src': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Agave_potatorum_1zz.jpg',
                    'caption': 'Test Caption'
                },
                {
                    'src': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Agave_potatorum_1zz.jpg',
                    'caption': 'Test Caption 2'
                },
                {
                    'src': 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Agave_potatorum_1zz.jpg',
                    'caption': 'Test Caption 3'
                },
            ],
            hint: 'Test hint',
            dykfact: 'The name mezcal comes from the Nahuatl (or Aztec) word “mexcalli” meaning an oven-cooked agave.',
            dyksrc: 'https://www.google.com'
        });

        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem('game', JSON.stringify(game));
    }, [game]);

    return (
        <>
            {gameInfo.visuals && <Clues game={game} gameInfo={gameInfo} onClueChange={setActiveClue} />}
            <div className="p-2">
                {game.status === 'finished' &&
                    <div className="flex gap-2 justify-center mt-2 mb-4">
                        <h2 className="text-xl tracking-tight font-extrabold text-slate-900">
                            {game.outcome === 'success' &&
                                <span className="flex gap-1 justify-center items-center">
                                    Success
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                    </svg>
                                </span>
                            }
                            {game.outcome === 'failure' &&
                                <span className="flex gap-1 justify-center items-center">
                                    Fail
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                    </svg>
                                </span>
                            }
                        </h2>
                        <button
                            onClick={() => onChangeView('stats')}
                            className="bg-forest-800 flex gap-1 items-center shadow-sm rounded-md px-2 py-1 text-xs text-white tracking-tight font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                            Stats
                        </button>
                    </div>
                }
                {game.status !== 'finished' && <Guesser gameId={1} onGuess={handleGuess} />}
                {game.guesses &&
                    <div>
                        {game.guesses.map((guess, i) => <Guess key={i} guessData={guess} />)}
                    </div>
                }
                {game.status !== 'finished' &&
                    <div className="border-t-2 mt-2 pt-2">
                        <p className="text-xs text-center text-slate-500">
                            Guesses remaining: {totalGuessesAllowed - game.guesses.length}
                        </p>
                    </div>
                }
                {game.status === 'finished' && gameInfo.dykfact &&
                    <div className="mt-6 text-xs text-center">
                        <h3 className="tracking-tight font-extrabold text-slate-900">Did You Know</h3>
                        <div>
                            <p>
                                {gameInfo.dykfact}&nbsp;<a href={gameInfo.dyksrc} className="text-forest-800 after:content-['_↗']">src</a>
                            </p>
                            <p></p>
                        </div>
                    </div>
                }
            </div>
            <button className="absolute bottom-0 right-0 text-xs text-white bg-black p-4" onClick={() => setGame(defaultGameState)}>Reset Game</button>
        </>
    )
}

export default Game