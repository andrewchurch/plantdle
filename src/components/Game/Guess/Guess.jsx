function Guess({ guessData }) {

    const indicatorClass = guessData.outcome === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className="flex gap-2 bg-gray-200 p-2 mt-1 items-center first:mt-0">
            <span className={`${indicatorClass} w-5 h-5`}>
                <span className="sr-only">{guessData.outcome}</span>
            </span>
            <span className="text-xs">{guessData.guess}</span>
        </div>
    );
}

export default Guess;