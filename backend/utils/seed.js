import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Note from '../models/Note.js';
import Link from '../models/Link.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await Note.deleteMany({});
    await Link.deleteMany({});

    console.log('Cleared existing data...');

    // Create demo user
    const demoUser = await User.create({
      fullName: 'Demo Student',
      email: 'demo@student.com',
      password: 'demo123',
      university: 'Cairo University',
      role: 'student',
    });

    console.log('Created demo user:', demoUser.email);

    // Create sample tasks
    const tasks = await Task.create([
      {
        user: demoUser._id,
        title: 'Complete Math Assignment',
        course: 'MATH101',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        priority: 'high',
        status: 'pending',
      },
      {
        user: demoUser._id,
        title: 'Prepare for Physics Exam',
        course: 'PHYS201',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        priority: 'high',
        status: 'in-progress',
      },
      {
        user: demoUser._id,
        title: 'Read Chapter 5 - History',
        course: 'HIST101',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: 'medium',
        status: 'pending',
      },
      {
        user: demoUser._id,
        title: 'Submit Lab Report',
        course: 'CS101',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday (overdue)
        priority: 'high',
        status: 'pending',
      },
    ]);

    console.log(`Created ${tasks.length} tasks`);

    // Create sample notes
    const notes = await Note.create([
      {
        user: demoUser._id,
        title: 'Important Dates',
        content: 'Midterm exams: Week 8\nFinal exams: Week 16\nRegistration deadline: Next Friday',
      },
      {
        user: demoUser._id,
        title: 'Study Tips',
        content: '1. Review notes daily\n2. Practice problems regularly\n3. Form study groups\n4. Get enough sleep',
      },
    ]);

    console.log(`Created ${notes.length} notes`);

    // Create sample links
    const links = await Link.create([
      {
        user: demoUser._id,
        title: 'University Portal',
        url: 'https://www.cu.edu.eg',
      },
      {
        user: demoUser._id,
        title: 'Library Resources',
        url: 'https://library.cu.edu.eg',
      },
      {
        user: demoUser._id,
        title: 'Student Services',
        url: 'https://studentservices.cu.edu.eg',
      },
    ]);

    console.log(`Created ${links.length} links`);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nDemo credentials:');
    console.log('Email: demo@student.com');
    console.log('Password: demo123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

