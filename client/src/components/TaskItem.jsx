const TaskItem = ({ task, onDelete, onEdit, onToggleStatus }) => {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status] || 'bg-gray-100'}`}>
                    {task.status}
                </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{task.description}</p>
            {task.dueDate && (
                <p className="text-xs text-gray-500 mb-4">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => onToggleStatus(task)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    {task.status === 'completed' ? 'Mark Pending' : 'Complete'}
                </button>
                <button
                    onClick={() => onEdit(task)}
                    className="text-sm text-gray-600 hover:text-gray-800"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="text-sm text-red-600 hover:text-red-800"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
