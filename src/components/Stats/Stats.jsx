
function Stats({ player }) {

    return (
        <>
            <p>Wins: {player.wins}</p>
            <p>Streak: {player.streak}</p>
        </>
    )
}

export default Stats