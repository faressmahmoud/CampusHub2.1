import { getUsers, getUserData, saveUserData } from './auth';

/**
 * Initialize placeholder data for demonstration
 * This creates a sample user and some example tasks/notes/links if no data exists
 */
export const initializePlaceholderData = () => {
  // Check if users already exist
  const users = getUsers();
  
  // Only initialize if no users exist (first time setup)
  if (users.length === 0) {
    // Create a demo user
    const demoUser = {
      fullName: 'Demo Student',
      email: 'demo@student.com',
      password: 'demo123',
      university: 'Cairo University',
    };
    
    // Save demo user
    users.push(demoUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Create placeholder tasks
    const placeholderTasks = [
      {
        id: '1',
        title: 'Complete Math Assignment',
        course: 'MATH101',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days from now
        priority: 'high',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Prepare for Physics Exam',
        course: 'PHYS201',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
        priority: 'high',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Read Chapter 5 - History',
        course: 'HIST101',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        priority: 'medium',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Submit Lab Report',
        course: 'CS101',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday (overdue)
        priority: 'high',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    // Create placeholder notes
    const placeholderNotes = [
      {
        id: '1',
        title: 'Important Dates',
        content: 'Midterm exams: Week 8\nFinal exams: Week 16\nRegistration deadline: Next Friday',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Study Tips',
        content: '1. Review notes daily\n2. Practice problems regularly\n3. Form study groups\n4. Get enough sleep',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    // Create placeholder links
    const placeholderLinks = [
      {
        id: '1',
        title: 'University Portal',
        url: 'https://www.cu.edu.eg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Library Resources',
        url: 'https://library.cu.edu.eg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Student Services',
        url: 'https://studentservices.cu.edu.eg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    // Save placeholder data for demo user
    saveUserData('tasks', demoUser.email, placeholderTasks);
    saveUserData('notes', demoUser.email, placeholderNotes);
    saveUserData('links', demoUser.email, placeholderLinks);
  }
};

