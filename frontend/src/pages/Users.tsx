import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Shield, User as UserIcon } from 'lucide-react';

interface User {
    id: number;
    username: string;
    email: string;
    roles: { id: number, name: string }[];
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch('http://localhost:8080/api/admin/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setUsers(await res.json());
                }
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setUsers(users.filter(u => u.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete user", err);
        }
    };

    return (
        <div className="p-6 h-full overflow-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">User Management</h1>
                <button className="glass px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition flex items-center gap-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <UserIcon size={16} />
                    Add User
                </button>
            </div>

            <div className="glass rounded-xl border border-white/10 overflow-hidden shadow-lg">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10 text-slate-300">
                        <tr>
                            <th className="p-4 font-semibold">ID</th>
                            <th className="p-4 font-semibold">Username</th>
                            <th className="p-4 font-semibold">Email</th>
                            <th className="p-4 font-semibold">Roles</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-white/5 transition">
                                <td className="p-4 text-slate-400">#{user.id}</td>
                                <td className="p-4 font-medium">{user.username}</td>
                                <td className="p-4 text-slate-300">{user.email}</td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {user.roles.map(r => (
                                            <span key={r.id} className="px-2 py-1 text-xs rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/20 flex items-center gap-1">
                                                <Shield size={12} />
                                                {r.name.replace('ROLE_', '')}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 flex justify-end gap-2">
                                    <button className="p-2 rounded hover:bg-white/10 text-slate-300 transition">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="p-2 rounded hover:bg-red-500/20 text-red-400 transition">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-400">
                                    No users found or you do not have Admin privileges.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
