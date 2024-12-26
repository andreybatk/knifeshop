import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAdmin } from "./Auth/AuthUtils";

export default function Header() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchRole = async () => {
            const isAdmin = await checkAdmin();
            setIsAdmin(isAdmin);
        };

        fetchRole();
    }, []);

    return (
        <header>
            <nav className="teal grey darken-4">
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo">Knife Shop</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { isAdmin && <li><Link to="/admin">Админ панель</Link></li> }
                    </ul>
                </div>
            </nav>
        </header>
    );
}