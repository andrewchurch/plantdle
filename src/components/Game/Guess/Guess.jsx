import { useRef, useEffect } from 'react';

function Guess({ guessData }) {

    const indicatorClass = guessData.outcome === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className="flex">
            <span className={`${indicatorClass} w-5 h-5`}>
                <span className="sr-only">{guessData.outcome}</span>
            </span>
            <span className="">{guessData.guess}</span>
        </div>
    );
}

export default Guess;