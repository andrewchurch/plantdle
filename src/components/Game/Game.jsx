import { useState, useEffect } from 'react';
import Clues from './Clues/Clues.jsx';
import Guess from './Guess/Guess.jsx';

function Game({ onChangeView }) {
    const numberOfGuesses = 4;

    const defaultPlayerState = {
        wins: 0,
        streak: 0
    };
    const [player, setPlayer] = useState(JSON.parse(localStorage.getItem('player')) || defaultPlayerState);

    const defaultGameState = {
        status: null,
        outcome: null,
        guesses: []
    };
    const [game, setGame] = useState(JSON.parse(localStorage.getItem('game')) || defaultGameState);

    const checkGuess = (guess) => {
        return false;
    }

    const handleGuess = (whichGuess, guess) => {
        let updatedGameState = {
            ...game,
            guesses: [...game.guesses]
        };

        const isCorrectGuess = checkGuess(guess);

        updatedGameState.guesses[whichGuess] = {
            state: isCorrectGuess ? 'success' : 'failure',
            guess: guess
        };

        if (isCorrectGuess) {
            updatedGameState.status = 'finished';
            updatedGameState.outcome = 'success';

        // if this was last guess the game is over
        } else if ((whichGuess + 1) === numberOfGuesses) {
            updatedGameState.status = 'finished';
            updatedGameState.outcome = 'failure';
        }

        setGame(updatedGameState);
    };

    useEffect(() => {
        localStorage.setItem('player', JSON.stringify(player));
        localStorage.setItem('game', JSON.stringify(game));
    }, [player, game]);

    let guessComponents = [];
    for (let i = 0; i < numberOfGuesses; i++) {
        let guessData = (game && game.guesses[i]) || {
            state: null,
            guess: null
        };

        // determine if this guess should be active based on state of other guesses
        if (guessData.state === null) {

            if (i === 0) {
                guessData.state = 'active';
            } else if (game && game.guesses[i - 1] && game.guesses[i - 1].state === 'failure') {
                guessData.state = 'active';
            }
        }

        guessComponents.push(<Guess key={i} guessIndex={i} guessData={guessData} onGuess={handleGuess} />);
    }

    return (
        <>
            <Clues />
            {game && game.status === 'finished' &&
                <>
                    {game.outcome === 'success' && <h2>Success!</h2>}
                    {game.outcome === 'failure' && <h2>Ugh!</h2>}
                    <button onClick={() => onChangeView('stats')}>Check Your Stats</button>
                </>
            }
            {guessComponents}
            {game && game.status === 'finished' &&
                <div className="">
                    <h3>Did You Know:</h3>
                    <div>
                        <p>The name mezcal comes from the Nahuatl (or Aztec) word “mexcalli” meaning an oven-cooked agave.</p>
                        <p><a href="" className="after:content-['_↗']">src</a></p>
                    </div>
                </div>
            }
        </>
    )
}

export default Game