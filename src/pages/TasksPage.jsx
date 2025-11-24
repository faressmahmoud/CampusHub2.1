import { useState, useEffect } from 'react';
import { getCurrentUser, getUserData, saveUserData } from '../utils/auth';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

/**
 * TasksPage component - main page for task management
 */
const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // Load user-specific tasks
      const userTasks = getUserData('tasks', user.email);
      setTasks(userTasks);
    }
  }, []);

  // Save tasks to localStorage
  const saveTasks = (newTasks) => {
    if (currentUser) {
      saveUserData('tasks', currentUser.email, newTasks);
      setTasks(newTasks);
    }
  };

  // Handle task submission (add or update)
  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map(task =>
        task.id === taskData.id ? taskData : task
      );
      saveTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Add new task
      const newTasks = [...tasks, taskData];
      saveTasks(newTasks);
    }
  };

  // Handle task update
  const handleTaskUpdate = (taskData) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskData.id ? taskData : task
    );
    saveTasks(updatedTasks);
  };

  // Handle task deletion
  const handleTaskDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      saveTasks(updatedTasks);
      if (editingTask && editingTask.id === taskId) {
        setEditingTask(null);
      }
    }
  };

  // Handle task edit
  const handleTaskEdit = (task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <TaskForm
        onSubmit={handleTaskSubmit}
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

