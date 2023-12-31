import CountUp from 'react-countup';

function Stats({ player, onChangeView }) {

    const gamesPlayed = player.gamesPlayed ? player.gamesPlayed : player.wins;
    const winPercentage = Math.floor(player.wins / gamesPlayed * 100);

    return (
        <div className="flex h-full py-4 md:py-8">
            <div className="m-auto text-center text-slate-900">
                <div className="grid grid-cols-1 gap-2">
                    <div className="px-8 py-6 bg-gray-200">
                        <CountUp
                            className="text-5xl tracking-tight font-light"
                            end={player.streak}
                        />
                        <h2 className="text-sm tracking-tight font-bold leading-none">Current Streak</h2>
                    </div>
                    <div className="px-8 py-6 bg-gray-200">
                        <CountUp
                            className="text-5xl tracking-tight font-light"
                            end={player.wins}
                        />
                        <h2 className="text-sm tracking-tight font-bold leading-none">Total Wins</h2>
                    </div>
                    <div className="px-8 py-6 bg-gray-200">
                        <CountUp
                            className="text-5xl tracking-tight font-light"
                            end={winPercentage}
                            suffix="%"
                        />
                        <h2 className="text-sm tracking-tight font-bold leading-none">Win Percentage</h2>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => onChangeView('game')}
                        className="bg-forest-800 flex gap-1 items-center shadow-sm rounded-md px-2 py-1 text-xs text-white tracking-tight font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Stats