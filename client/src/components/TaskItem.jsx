const TaskItem = ({ task, onDelete, onEdit, onToggleStatus }) => {
    const statusColors = {
        pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
        'in-progress': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        completed: 'bg-green-500/10 text-green-400 border border-green-500/20',
    };

    return (
        <div className="bg-surface p-6 rounded-xl shadow-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{task.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[task.status] || 'bg-gray-500/10 text-gray-400'}`}>
                    {task.status}
                </span>
            </div>
            <p className="text-text-muted mb-6 text-sm leading-relaxed line-clamp-3">{task.description}</p>
            {task.dueDate && (
                <div className="flex items-center text-xs text-text-muted mb-4 bg-background/50 p-2 rounded-lg w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
            )}
            <div className="flex justify-end space-x-2 pt-4 border-t border-white/5">
                <button
                    onClick={() => onToggleStatus(task)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${task.status === 'completed'
                            ? 'text-yellow-400 hover:bg-yellow-400/10'
                            : 'text-green-400 hover:bg-green-400/10'
                        }`}
                >
                    {task.status === 'completed' ? 'Mark Pending' : 'Complete'}
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg text-blue-400 hover:bg-blue-400/10 transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
