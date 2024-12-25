import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import AdminPanel from "./components/Admin/Panel";

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer />
        </Router>
    );
}