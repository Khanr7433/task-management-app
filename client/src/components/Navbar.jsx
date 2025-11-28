import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Task Manager
                </Link>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="hover:text-blue-200">Home</Link>
                    <Link to="/tasks" className="hover:text-blue-200">Tasks</Link>
                    {user ? (
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-gray-100">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
