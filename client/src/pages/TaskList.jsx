import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Mock data for initial UI testing (replace with API call later)
    useEffect(() => {
        const fetchTasks = async () => {
            // For now, we'll use mock data if API fails or is not ready
            try {
                const res = await axios.get('/api/tasks');
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                // Fallback mock data
                setTasks([
                    { _id: '1', title: 'Sample Task 1', description: 'Description 1', status: 'pending', dueDate: new Date().toISOString() },
                    { _id: '2', title: 'Sample Task 2', description: 'Description 2', status: 'in-progress', dueDate: new Date().toISOString() },
                ]);
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
                await axios.delete(`/api/tasks/${id}`);
                setTasks(tasks.filter((t) => t._id !== id));
            } catch (error) {
                console.error("Error deleting task:", error);
                // Optimistic update for mock
                setTasks(tasks.filter((t) => t._id !== id));
            }
        }
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const res = await axios.put(`/api/tasks/${task._id}`, { ...task, status: newStatus });
            setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
        } catch (error) {
            console.error("Error updating status:", error);
            // Optimistic update for mock
            setTasks(tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)));
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingTask) {
                const res = await axios.put(`/api/tasks/${editingTask._id}`, formData);
                setTasks(tasks.map((t) => (t._id === editingTask._id ? res.data : t)));
            } else {
                const res = await axios.post('/api/tasks', formData);
                setTasks([...tasks, res.data]);
            }
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error saving task:", error);
            // Mock update
            if (editingTask) {
                setTasks(tasks.map((t) => (t._id === editingTask._id ? { ...t, ...formData } : t)));
            } else {
                setTasks([...tasks, { ...formData, _id: Date.now().toString() }]);
            }
            setIsFormOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm"
                    >
                        Add New Task
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                            onToggleStatus={handleToggleStatus}
                        />
                    ))}
                </div>

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
