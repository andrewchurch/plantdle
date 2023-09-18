function Footer({ gameId }) {

    return (
        <div className="py-2 flex text-xs text-white">
            <p>#{gameId}</p>
            <p className="ml-auto">
                <a href="https://andrewthewebguy.com/" className="text-forest-300 after:content-['_↗']">
                    <span className="">andrewthewebguy.com</span>
                </a>
            </p>
        </div>
    )
}

export default Footer;