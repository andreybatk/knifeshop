import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import AdminPanel from "./components/Admin/Panel";
import KnifeDetails from "./components/Knife/KnifeDetails";
import KnifeEdit from "./components/Knife/KnifeEdit";

export default function App() {
    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }}>
        </div>
            <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/knifes/:id" element={<KnifeDetails />} />
                <Route path="/knifes/:id/edit" element={<KnifeEdit />} />
            </Routes>
            <Footer />
        </Router>
    );
}

