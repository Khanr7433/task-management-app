import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-surface border-b border-white/5 shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold font-display tracking-tight text-white hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                    Task Manager
                </Link>
                <div className="space-x-6 flex items-center">
                    <Link to="/" className="text-text-muted hover:text-white transition-colors text-sm font-medium">Home</Link>
                    <Link to="/tasks" className="text-text-muted hover:text-white transition-colors text-sm font-medium">Tasks</Link>
                    {user ? (
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to logout?')) {
                                    logout();
                                }
                            }}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/10"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-text-muted hover:text-white transition-colors text-sm font-medium">Login</Link>
                            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 hover:scale-105 active:scale-95">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
