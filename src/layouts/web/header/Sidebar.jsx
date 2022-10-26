export default function Sidebar() {
    return (
        <div className="mobile-menu">
            <input type="checkbox" name="" id="" />
            <div className="hamburger-lines">
                <span className="line line1" />
                <span className="line line2" />
                <span className="line line3" />
            </div>
            <ul className="menu-items">
                <li><a href="/">Home</a></li>
                <li><a href="tokenomics">Tokenomics</a></li>
                <li><a href="https://legacyofempires.gitbook.io/untitled/" target="_blank" rel="noreferrer">Whitepaper</a></li>
                <li><a href="marketplace">Marketplace</a></li>
                <li><a href="/#team_section">Team</a></li>
            </ul>
        </div>
    );
}