import { useRef, useEffect } from 'react';
import guessClasses from './guessClasses.mjs';

function Guess({ guessIndex, guessData, onGuess }) {
    const inputRef = useRef(null);

    let classes = { ...guessClasses.default };
    const classChanges = guessClasses[guessData && guessData.state] || '';
    if (classChanges) {
        Object.keys(classChanges.add).forEach(key => classes[key] = [...classes[key], ...classChanges.add[key]]);
        Object.keys(classChanges.remove).forEach(key => {
            classes[key] = classes[key].filter(c => !classChanges.remove[key].includes(c));
        });
    }

    const handleGuess = (event) => {
        event.preventDefault();

        const guess = inputRef.current.value.trim();
        if (!guess) {
            // set error
            return;
        }

        onGuess(guessIndex, guess);
    };

    useEffect(() => {
        inputRef.current.value = guessData.guess;
    }, []);

    return (
        <form className={classes.wrapper.join(' ')} onSubmit={handleGuess}>
            <span className={classes.indicator.join(' ')}></span>
            <input 
                ref={inputRef} 
                className={classes.input.join(' ')} 
                readOnly={guessData.state !== 'active'}
                type="text" placeholder="Guess" required 
            />
            {guessData.state === 'active' && 
                <button className={classes.button.join(' ')}>Submit</button>
            }
        </form>
    );
}

export default Guess;