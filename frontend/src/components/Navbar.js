import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            {/* Left: Logo */}
            <div className="navbar-brand">
                <img
                    src="/assets/Alcher_Logo.svg"
                    alt="Alcheringa IIT Guwahati"
                    className="navbar-logo"
                />
            </div>

            {/* Centre: Navigation links */}
            <div className="navbar-links">
                <a href="#about">About Us</a>
                <a href="#modules">Modules &amp; Competitions</a>
                <a href="#contact">Contact us</a>
            </div>

            {/* Right: Login */}
            <div className="navbar-actions">
                <button className="login-button">Login</button>
            </div>
        </nav>
    );
}

export default Navbar;