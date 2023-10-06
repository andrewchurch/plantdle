function Guess({ guessData }) {
    const indicatorClass = 
        guessData.outcome === 'success' ? 'bg-green-600' : 
        guessData.outcome === 'failure' ? 'bg-red-600' :
        'bg-gray-600';

    return (
        <div className={`${indicatorClass} py-2 px-2 mt-1 text-white`}>
            <h4 className="leading-none">
                <span className="text-sm font-semibold">{guessData.commonName}</span>
                <span className="text-xs">&nbsp;({guessData.scientificNames?.join(', ')})</span>
            </h4>
            {guessData.commonAliases && guessData.outcome !== 'failure' &&  
                <span className="flex gap-1 border-t mt-1 pt-1 font-normal text-xs"> 
                    <span>a.k.a.</span> 
                    <span>{guessData.commonAliases.join(', ')}</span>
                </span>
            }
        </div>
    );
}

export default Guess;