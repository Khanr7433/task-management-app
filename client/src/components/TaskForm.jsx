import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                status: initialData.status || 'pending',
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full flex justify-center items-center z-50 transition-opacity duration-300">
            <div className="bg-surface p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/10 transform transition-all duration-300 scale-100">
                <h2 className="text-2xl font-bold mb-6 text-white font-display tracking-tight">
                    {initialData ? 'Edit Task' : 'Add New Task'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder-text-muted/50"
                            placeholder="Task title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 placeholder-text-muted/50"
                            rows="3"
                            placeholder="Task description"
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 cursor-pointer"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-medium mb-2 ml-1">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 dark-calendar-icon"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-5 py-2.5 bg-surface border border-white/10 text-text-muted rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (initialData ? 'Update Task' : 'Add Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
