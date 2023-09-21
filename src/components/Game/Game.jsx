import { useState, useEffect } from 'react';
import Clues from './Clues/Clues.jsx';
import Guesser from './Guesser/Guesser.jsx';
import Guess from './Guess/Guess.jsx';
import { getGameInfo } from '../../services/data.mjs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

function Game({ gameId, onChangeView, onGameOver }) {
    const totalGuessesAllowed = 3;
    
    const [gameInfo, setGameInfo] = useState(JSON.parse(localStorage.getItem('gameInfo')) || {});

    const defaultGameState = {
        activeClue: 0,
        gameId: gameId,
        versionId: import.meta.env.VITE_GAME_VERSION,
        guesses: [],
        outcome: null,
        status: null
    };
    const [game, setGame] = useState(JSON.parse(localStorage.getItem('game')) || defaultGameState);
    if (game.gameId !== gameId) {
        setGame(defaultGameState);
    }
    if (import.meta.env.VITE_GAME_VERSION && game.versionId !== import.meta.env.VITE_GAME_VERSION) {
        setGame(defaultGameState);
    }

    const setActiveClue = (clue) => {
        setGame(currentGameState => ({
            ...currentGameState,
            activeClue: clue
        }));
    }

    const checkGuess = (guessId) => {
        return guessId === gameInfo.plantId;
    }

    const handleGuess = (guess) => {
        setGame(currentGameState => {
            let updatedGameState = {
                ...currentGameState,
                guesses: [...currentGameState.guesses]
            };

            const isCorrectGuess = checkGuess(guess.id);
            updatedGameState.guesses.unshift({
                ...guess,
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

    const fetchGameInfo = async () => {
        getGameInfo(gameId).then((response => {
            try {
                const data = response.items[0].fields;
                setGameInfo({
                    gameId: gameId,
                    plantId: data.id,
                    commonName: data.commonName,
                    scientificNames: data.scientificNames,
                    commonAliases: data.commonAliases,
                    photos: data.photos?.map(photo => ({
                        src: `${photo.fields.file.url}?fm=webp&w=900&h=600`,
                        caption: photo.fields.title
                    })),
                    hint: data.hint,
                    dykfact: documentToHtmlString(data.didYouKnow),
                    dyksrc: data.didYouKnowSrc
                });
            } catch (e) {
                console.log('Error retrieving game data');
                console.log('Error details: ', e);
            }
        }));
    }

    useEffect(() => {
        if (gameInfo.gameId !== gameId) {
            fetchGameInfo();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('game', JSON.stringify(game));
    }, [game]);

    useEffect(() => {
        localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    }, [gameInfo]);

    return (
        <>
            {gameInfo.photos && <Clues game={game} gameInfo={gameInfo} onClueChange={setActiveClue} />}
            <div className="p-2 md:p-4">
                {game.status !== 'finished' && <Guesser gameId={gameId} onGuess={handleGuess} />}
                {game.status === 'finished' && game.outcome === 'failure' && 
                    <>
                        <h3 className="tracking-tight font-extrabold text-xs text-slate-900">
                            Incorrect! The correct answer was:
                        </h3>
                        <Guess guessData={{
                            id: gameInfo.plantId,
                            commonName: gameInfo.commonName,
                            scientificNames: gameInfo.scientificNames,
                            commonAliases: gameInfo.commonAliases,
                            outcome: null
                        }} />
                    </>
                }
                {game.guesses &&
                    <div>
                        {game.outcome === 'failure' &&
                            <h3 className="mt-2 tracking-tight font-extrabold text-xs text-slate-900">
                                Your Guesses
                            </h3>
                        }
                        {game.outcome === 'success' && 
                            <h3 className="mt-2 tracking-tight font-extrabold text-xs text-slate-900">
                                Correct! Way to go!
                            </h3>
                        }
                        {game.guesses.map((guess, i) => <Guess key={i} guessData={guess} />)}
                    </div>
                }
                {game.status !== 'finished' &&
                    <div className="border-t-2 mt-1 pt-1">
                        <p className="text-xs text-center text-slate-500">
                            Guesses remaining: {totalGuessesAllowed - game.guesses.length}
                        </p>
                    </div>
                }
                {gameInfo.dykfact && game.status === 'finished' &&
                    <div className="border-t-2 mt-2 pt-2 text-xs">
                        <div className="flex gap-1">
                            <h3 className="tracking-tight font-extrabold text-slate-900">
                                Did You Know
                            </h3>
                            <p>(<a href={gameInfo.dyksrc} className="text-forest-800 after:content-['_↗']">src</a>)</p>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: gameInfo.dykfact }}></div>
                    </div>
                }
            </div>
            {import.meta.env.DEV && 
                <button className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-white bg-black p-2" onClick={() => setGame(defaultGameState)}>Reset Game</button>
            }
        </>
    )
}

export default Game