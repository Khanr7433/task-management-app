import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData, rememberMe);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="max-w-md w-full bg-surface p-8 rounded-xl shadow-2xl border border-white/5 transition-all duration-300 hover:shadow-primary/10">
                <h2 className="text-3xl font-bold mb-2 text-center text-white font-display">Welcome Back</h2>
                <p className="text-center text-text-muted mb-8 text-sm">Please enter your details to sign in</p>
                
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 animate-pulse">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
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
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary bg-background"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-sm text-text-muted cursor-pointer hover:text-text-main transition-colors">Remember Me</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-text-muted">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-primary-hover font-medium hover:underline transition-colors">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
