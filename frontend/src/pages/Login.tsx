import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
            
            <div className="glass p-8 rounded-2xl w-full max-w-md z-10 border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">FloodGuard</h1>
                    <p className="text-slate-400 text-sm">Enterprise Disaster Management System</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
                        <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="admin" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input type="password" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" placeholder="••••••••" required />
                    </div>
                    
                    <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition shadow-lg mt-4">
                        Secure Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
