function ClueChanger({ thisClue, activeClue, onClueChange }) {
    const classes = thisClue === activeClue ? 'bg-gray-800 text-white' : 'bg-gray-300';

    return (
        <button
            className={`${classes} px-2`}
            onClick={() => onClueChange(thisClue)}>
            {thisClue + 1}
        </button>
    )
}

function Clues({ game, gameInfo, onClueChange }) {   
    const currentNumberOfGuesses = game.guesses.length;
    const activeClueIndex = game.activeClue;
    const activeVisualIndex = activeClueIndex >= gameInfo.visuals.length ? gameInfo.visuals.length - 1 : activeClueIndex;
    const activeVisual = gameInfo.visuals[activeVisualIndex];
    const isHintActive = currentNumberOfGuesses >= gameInfo.visuals.length;
    const clueChangers = gameInfo.visuals.map((visual, i) => {
        if (game.status !== 'finished' && i > currentNumberOfGuesses) return;
        return <ClueChanger key={i} thisClue={i} activeClue={activeVisualIndex} onClueChange={onClueChange} />;
    });

    return (
        <div className="">
            <div className="aspect-video relative">
                <div className="">
                    <img className="aspect-video absolute top-0 left-0" src={activeVisual.src} />
                    <p className="absolute top-full right-0 text-xs">{activeVisual.caption}</p>
                </div>
            </div>
            <div className="">
                {clueChangers}
            </div>
            {(game.status === 'finished' || isHintActive) && 
                <p>{gameInfo.hint}</p>
            }
        </div>
    )
}

export default Clues;