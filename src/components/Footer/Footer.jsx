function Footer({ gameId }) {

    return (
        <div className="py-2 flex text-xs text-forest-500">
            <p>Game #{gameId}</p>
            <p className="ml-auto">
                For Lisa by&nbsp;<a href="https://andrewthewebguy.com/">Andrew</a>
            </p>
        </div>
    )
}

export default Footer;