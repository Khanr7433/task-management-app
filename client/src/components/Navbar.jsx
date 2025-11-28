import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    Task Manager
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-blue-200">Home</Link>
                    <Link to="/tasks" className="hover:text-blue-200">Tasks</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
