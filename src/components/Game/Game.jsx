import { useState, useEffect } from 'react';
import { getAll, getGameData } from '../../services/data.mjs';
import Clues from './Clues/Clues.jsx';
import Guesser from './Guesser/Guesser.jsx';
import Guess from './Guess/Guess.jsx';

function Game({ onChangeView }) {
    const totalGuessesAllowed = 4;

    const [isLoading, setLoading] = useState(false);
    const [gameInfo, setGameInfo] = useState({});

    const defaultPlayerState = {
        wins: 0,
        streak: 0
    };
    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('player')) || defaultPlayerState);

    const defaultGameState = {
        status: null,
        outcome: null,
        activeClue: 0,
        guesses: []
    };
    const [game, setGame] = useState(JSON.parse(localStorage.getItem('game')) || defaultGameState);
    
    const checkGuess = (guess) => {
        return false;
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
    
            const isCorrectGuess = checkGuess(guessLabel);
    
            updatedGameState.guesses.unshift({
                guess: guessLabel,
                outcome: isCorrectGuess ? 'success' : 'failure'
            });
            
            if (isCorrectGuess) {
                updatedGameState.status = 'finished';
                updatedGameState.outcome = 'success';
            
            } else {

                // if this was last guess the game is over
                if ((currentGameState.guesses.length + 1) === totalGuessesAllowed) {
                    updatedGameState.status = 'finished';
                    updatedGameState.outcome = 'failure';
                
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
            answer: 1,
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

    useEffect(() => {
        localStorage.setItem('player', JSON.stringify(player));
    }, [player]);

    return (
        <>
            {gameInfo.visuals && <Clues game={game} gameInfo={gameInfo} onClueChange={setActiveClue} />}
            {game.status === 'finished' &&
                <>
                    {game.outcome === 'success' && <h2>Success!</h2>}
                    {game.outcome === 'failure' && <h2>Ugh!</h2>}
                    <button onClick={() => onChangeView('stats')}>Check Your Stats</button>
                </>
            }
            {game.status !== 'finished' && <Guesser onGuess={handleGuess} />}
            {game.guesses && game.guesses.map((guess, i) => <Guess key={i} guessData={guess} />)}
            <p>Guesses remaining: {totalGuessesAllowed - game.guesses.length}</p>
            {game.status === 'finished' && gameInfo.dykfact &&
                <div className="">
                    <h3>Did You Know:</h3>
                    <div>
                        <p>{gameInfo.dykfact}</p>
                        <p><a href={gameInfo.dyksrc} className="after:content-['_↗']">src</a></p>
                    </div>
                </div>
            }
            <button className="absolute bottom-0 right-0 text-xs text-white bg-black p-4" onClick={() => setGame(defaultGameState)}>Reset</button>
        </>
    )
}

export default Game