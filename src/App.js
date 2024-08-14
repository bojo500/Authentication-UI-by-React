import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Signup from './Component/Sign up/Signup';
import Chat from './Component/Chat/Chat';
import StickyNavbar from "./Component/NavBar/StickyNavbar";


function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Router>
            <StickyNavbar onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;
