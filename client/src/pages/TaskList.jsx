import { useState, useEffect, useContext, useMemo } from 'react';
import taskService from '../services/taskService';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import AuthContext from '../context/AuthContext';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout } = useContext(AuthContext);

    // Filter, Sort, Search States
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskService.getTasks();
                setTasks(data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks.");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleAddTask = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                setTasks(tasks.filter((t) => t._id !== id));
            } catch (err) {
                console.error("Error deleting task:", err);
                alert("Failed to delete task.");
            }
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const updatedTask = await taskService.updateTask(task._id, { ...task, status: newStatus });
            setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update status.");
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingTask) {
                const updatedTask = await taskService.updateTask(editingTask._id, formData);
                setTasks(tasks.map((t) => (t._id === editingTask._id ? updatedTask : t)));
            } else {
                const newTask = await taskService.createTask(formData);
                setTasks([...tasks, newTask]);
            }
            setIsFormOpen(false);
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Failed to save task.");
        }
    };

    // Filter, Sort, Search Logic
    const filteredTasks = useMemo(() => {
        let result = [...tasks];

        // Search
        if (searchQuery) {
            result = result.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter
        if (filterStatus !== 'all') {
            result = result.filter(task => task.status === filterStatus);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortBy === 'dueDate') {
                // Handle cases where dueDate might be null or undefined
                const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31'); // Push nulls to end
                const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31'); // Push nulls to end
                return dateA - dateB;
            }
            return 0;
        });

        return result;
    }, [tasks, searchQuery, filterStatus, sortBy]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading tasks...</div>;

    return (
        <div className="min-h-screen bg-background text-text-main">
            <Navbar onLogout={logout} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white font-display tracking-tight">My Tasks</h1>
                    <button
                        onClick={handleAddTask}
                        className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Add New Task
                    </button>
                </div>

                {/* Controls */}
                <div className="bg-surface p-5 rounded-xl border border-white/5 shadow-xl mb-8 flex flex-col md:flex-row gap-4 transition-all hover:border-white/10">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder-text-muted"
                    />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-background border border-white/10 rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-background border border-white/10 rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                </div>

                {error && <p className="text-red-400 mb-6 bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

                {filteredTasks.length === 0 && !error ? (
                    <div className="text-center py-16 bg-surface rounded-xl border border-white/5 border-dashed">
                        <p className="text-text-muted text-lg">No tasks found matching your criteria.</p>
                        <button onClick={handleAddTask} className="mt-4 text-primary hover:text-primary-hover font-medium hover:underline">
                            Create a new task
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onDelete={handleDeleteTask}
                                onEdit={handleEditTask}
                                onToggleStatus={handleToggleStatus}
                            />
                        ))}
                    </div>
                )}

                {isFormOpen && (
                    <TaskForm
                        onSubmit={handleFormSubmit}
                        initialData={editingTask}
                        onCancel={() => setIsFormOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default TaskList;
