function ClueChanger({ thisClue, activeClue, onClueChange }) {
    const classes = thisClue === activeClue ? 'bg-gray-200' : 'bg-forest-800 text-white';

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
    const activePhotoIndex = activeClueIndex >= gameInfo.photos.length ? gameInfo.photos.length - 1 : activeClueIndex;
    const activePhoto = gameInfo.photos[activePhotoIndex];
    const isHintActive = currentNumberOfGuesses === gameInfo.photos.length - 1; // show hint when we show last photo
    const clueChangers = gameInfo.photos.map((Photo, i) => {
        if (game.status !== 'finished' && i > currentNumberOfGuesses) return;
        return <ClueChanger key={i} thisClue={i} activeClue={activePhotoIndex} onClueChange={onClueChange} />;
    });

    return (
        <div className="">
            <div className="aspect-[3/2] relative">
                <div className="overflow-hidden absolute top-0 left-0 h-full">
                    <img className="object-cover" src={activePhoto.src} />
                </div>
                {game.status === 'finished' &&
                    <p className="absolute top-full right-0 pt-1 px-2 text-xs text-slate-500 md:px-4">{activePhoto.caption}</p>
                }
                {(game.status === 'finished' || isHintActive) && 
                    <p className="absolute bottom-0 bg-gray-200 w-full text-xs px-2 py-1 md:px-4">
                        Hint: {gameInfo.hint}
                    </p>
                }
            </div>
            <div className="flex pl-4 gap-2 border-t-2">
                {clueChangers}
            </div>
        </div>
    )
}

export default Clues;