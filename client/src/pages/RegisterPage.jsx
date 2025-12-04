import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        try {
            await register(formData);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full bg-surface p-8 rounded-xl shadow-2xl border border-white/5 transition-all duration-300 hover:shadow-primary/10">
                <h2 className="text-3xl font-bold mb-2 text-center text-white font-display">Create Account</h2>
                <p className="text-center text-text-muted mb-8 text-sm">Join us to manage your tasks efficiently</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20 mt-2"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-text-muted">
                    Already have an account? <Link to="/login" className="text-primary hover:text-primary-hover font-medium hover:underline transition-colors">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
