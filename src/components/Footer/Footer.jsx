function Footer({ gameId }) {

    return (
        <div className="py-2 flex text-xs text-forest-500">
            <p>Game #{gameId}</p>
            <p className="ml-auto">
                <a href="https://andrewthewebguy.com/" className="after:content-['_↗']">
                    <span className="">andrewthewebguy.com</span>
                </a>
            </p>
        </div>
    )
}

export default Footer;