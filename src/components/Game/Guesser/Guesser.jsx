import { useRef, useEffect } from 'react';

function Guesser({ onGuess }) {
    const inputRef = useRef(null);

    const handleGuess = (event) => {
        event.preventDefault();

        const guess = inputRef.current.value.trim();
        if (!guess) {
            // set error
            return;
        }

        onGuess(guess);
    };

    useEffect(() => {

    }, []);

    return (
        <form onSubmit={handleGuess}>
            <input 
                ref={inputRef} 
                className="border-2"
                type="text" placeholder="Guess" required 
            />
            <button className="bg-forest-500">Submit</button>
        </form>
    );
}

export default Guesser;