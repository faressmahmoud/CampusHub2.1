import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

/**
 * TasksPage component - main page for task management
 */
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle task submission (add or update)
  const handleTaskSubmit = async (taskData) => {
    try {
      setError('');
      if (editingTask) {
        // Update existing task
        const response = await updateTask(editingTask._id || editingTask.id, taskData);
        if (response.success) {
          setTasks(tasks.map(task => 
            (task._id || task.id) === (editingTask._id || editingTask.id) ? response.data : task
          ));
          setEditingTask(null);
        }
      } else {
        // Add new task
        const response = await createTask(taskData);
        if (response.success) {
          setTasks([...tasks, response.data]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task. Please try again.');
      console.error('Error saving task:', err);
    }
  };

  // Handle task update
  const handleTaskUpdate = async (taskData) => {
    try {
      setError('');
      const response = await updateTask(taskData._id || taskData.id, taskData);
      if (response.success) {
        setTasks(tasks.map(task => 
          (task._id || task.id) === (taskData._id || taskData.id) ? response.data : task
        ));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setError('');
        const response = await deleteTask(taskId);
        if (response.success) {
          setTasks(tasks.filter(task => (task._id || task.id) !== taskId));
          if (editingTask && (editingTask._id || editingTask.id) === taskId) {
            setEditingTask(null);
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task. Please try again.');
        console.error('Error deleting task:', err);
      }
    }
  };

  // Handle task edit
  const handleTaskEdit = (task) => {
    // Prevent editing completed tasks
    if (task.status === 'completed') {
      return;
    }
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle task reopen (from TaskForm)
  const handleTaskReopen = async (taskData) => {
    try {
      setError('');
      // When reopening, update the task status to pending
      const response = await updateTask(taskData._id || taskData.id, taskData);
      if (response.success) {
        setTasks(tasks.map(task => 
          (task._id || task.id) === (taskData._id || taskData.id) ? response.data : task
        ));
        // Clear editing state after reopen
        setEditingTask(null);
        // Reload tasks to refresh the UI
        await loadTasks();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reopen task. Please try again.');
      console.error('Error reopening task:', err);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <TaskForm
        onSubmit={editingTask?.status === 'completed' ? handleTaskReopen : handleTaskSubmit}
        initialData={editingTask}
        onCancel={editingTask ? handleCancelEdit : null}
      />
      <TaskList
        tasks={tasks}
        onUpdate={handleTaskUpdate}
        onDelete={handleTaskDelete}
        onEdit={handleTaskEdit}
      />
    </div>
  );
};

export default TasksPage;

