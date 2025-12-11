import { useState } from 'react';

/**
 * TaskForm component - form for adding/editing tasks
 */
const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    course: initialData?.course || '',
    dueDate: initialData?.dueDate || '',
    priority: initialData?.priority || 'medium',
    status: initialData?.status || 'pending',
  });
  const [error, setError] = useState('');

  // Check if task is completed (non-editable)
  const isCompleted = initialData?.status === 'completed';
  const isDisabled = isCompleted;

  // Handle input changes
  const handleChange = (e) => {
    if (isDisabled) return; // Prevent changes when completed
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  // Validate form
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!formData.dueDate) {
      setError('Due date is required');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
    };

    onSubmit(taskData);
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        title: '',
        course: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
      });
    }
  };

  // Handle reopen task
  const handleReopen = (e) => {
    e.preventDefault();
    if (onSubmit && initialData) {
      const reopenedTask = {
        ...initialData,
        status: 'pending', // Reset to pending when reopened
      };
      onSubmit(reopenedTask);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {initialData ? (isCompleted ? 'Completed Task' : 'Edit Task') : 'Add New Task'}
        </h2>
        {isCompleted && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✓ Completed
          </span>
        )}
      </div>
      
      {isCompleted && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
          <p className="text-sm">This task is completed and cannot be edited. Use "Reopen Task" to make changes.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
            }`}
            placeholder="e.g., Complete Math Assignment"
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            Course (Optional)
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
            }`}
            placeholder="e.g., CS101"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
            }`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={isDisabled}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isDisabled}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
              }`}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3">
          {isCompleted ? (
            <button
              type="button"
              onClick={handleReopen}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Reopen Task
            </button>
          ) : (
            <>
              <button
                type="submit"
                disabled={isDisabled}
                className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {initialData ? 'Update Task' : 'Add Task'}
              </button>
              {initialData && onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

