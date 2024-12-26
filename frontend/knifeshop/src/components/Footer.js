export default function Footer() {
    return (
        <footer className="page-footer grey darken-4">
            <div className="container">
                © {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    );
}