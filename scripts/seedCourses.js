import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Course from '../src/models/Course.js';
import Lesson from '../src/models/Lesson.js';
import Quiz from '../src/models/Quiz.js';
import { Roles } from '../src/utils/constants.js';

dotenv.config();

const coursesData = [
  {
    title: 'Introduction to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming from scratch. Perfect for beginners who want to start their coding journey.',
    category: 'programming',
    level: 'beginner',
    visibility: 'published',
    lessons: [
      {
        title: 'What is JavaScript?',
        type: 'text',
        order: 1,
        text: 'JavaScript is a versatile programming language that powers interactive websites. It runs in browsers and on servers, making it essential for web development. JavaScript was created in 1995 and has become one of the most popular programming languages in the world.'
      },
      {
        title: 'Variables and Data Types',
        type: 'video',
        order: 2,
        contentUrl: 'https://www.youtube.com/embed/gnkrDse9QKc'
      },
      {
        title: 'Functions and Scope',
        type: 'text',
        order: 3,
        text: 'Functions are reusable blocks of code. They help organize your program and make it easier to maintain. Functions can accept parameters and return values, making them powerful tools for creating modular code.'
      },
      {
        title: 'Arrays and Objects',
        type: 'video',
        order: 4,
        contentUrl: 'https://www.youtube.com/embed/R8rmfD9Y5-c'
      },
      {
        title: 'Control Flow (If/Else)',
        type: 'text',
        order: 5,
        text: 'Control flow statements let your program make decisions based on conditions. Use if/else statements to execute different code paths depending on whether conditions are true or false.'
      }
    ],
    quiz: {
      title: 'JavaScript Basics Quiz',
      questions: [
        {
          question: 'What is JavaScript primarily used for?',
          type: 'mcq',
          options: ['Web development', 'Database management', 'Operating systems', 'Hardware drivers'],
          answer: 0
        },
        {
          question: 'JavaScript is a compiled language.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: false
        },
        {
          question: 'Which keyword is used to declare a variable in modern JavaScript?',
          type: 'short',
          answer: 'let'
        }
      ]
    }
  },
  {
    title: 'React for Beginners',
    description: 'Master React, the most popular JavaScript library for building user interfaces. Learn components, hooks, and state management.',
    category: 'web development',
    level: 'intermediate',
    visibility: 'published',
    lessons: [
      {
        title: 'Introduction to React',
        type: 'video',
        order: 1,
        contentUrl: 'https://www.youtube.com/embed/SqcY0GlETPk'
      },
      {
        title: 'JSX and Components',
        type: 'text',
        order: 2,
        text: 'JSX lets you write HTML-like code in JavaScript. Components are the building blocks of React applications. Every React app is made up of components that can be reused throughout your application.'
      },
      {
        title: 'Props and State',
        type: 'video',
        order: 3,
        contentUrl: 'https://www.youtube.com/embed/6L6XqWoS8tw'
      },
      {
        title: 'React Hooks (useState, useEffect)',
        type: 'text',
        order: 4,
        text: 'Hooks let you use state and other React features in functional components. useState manages component state, while useEffect handles side effects like data fetching and subscriptions.'
      },
      {
        title: 'Building Your First React App',
        type: 'video',
        order: 5,
        contentUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
      }
    ],
    quiz: {
      title: 'React Fundamentals Quiz',
      questions: [
        {
          question: 'What does JSX stand for?',
          type: 'mcq',
          options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'Java XML'],
          answer: 0
        },
        {
          question: 'React components must return a single root element.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: true
        },
        {
          question: 'Which hook is used for side effects in React?',
          type: 'short',
          answer: 'useEffect'
        }
      ]
    }
  },
  {
    title: 'Python Programming Fundamentals',
    description: 'Start your Python journey with this comprehensive course covering syntax, data structures, and object-oriented programming.',
    category: 'programming',
    level: 'beginner',
    visibility: 'published',
    lessons: [
      {
        title: 'Getting Started with Python',
        type: 'video',
        order: 1,
        contentUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc'
      },
      {
        title: 'Python Syntax and Variables',
        type: 'text',
        order: 2,
        text: 'Python uses indentation to define code blocks. Variables are dynamically typed and don\'t require declaration. Python is known for its clean, readable syntax that makes it perfect for beginners.'
      },
      {
        title: 'Lists, Tuples, and Dictionaries',
        type: 'video',
        order: 3,
        contentUrl: 'https://www.youtube.com/embed/HGOBQPFzWKo'
      },
      {
        title: 'Functions and Modules',
        type: 'text',
        order: 4,
        text: 'Functions help organize code. Modules let you reuse code across different files. Python has a rich standard library with modules for almost everything you need.'
      },
      {
        title: 'Object-Oriented Programming in Python',
        type: 'video',
        order: 5,
        contentUrl: 'https://www.youtube.com/embed/JeznW_7DlB0'
      },
      {
        title: 'File Handling and Exceptions',
        type: 'text',
        order: 6,
        text: 'Learn to read/write files and handle errors gracefully with try-except blocks. Proper exception handling makes your programs more robust and user-friendly.'
      }
    ],
    quiz: {
      title: 'Python Basics Quiz',
      questions: [
        {
          question: 'Which of the following is NOT a Python data type?',
          type: 'mcq',
          options: ['List', 'Dictionary', 'Array', 'Tuple'],
          answer: 2
        },
        {
          question: 'Python uses curly braces to define code blocks.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: false
        },
        {
          question: 'What keyword is used to create a function in Python?',
          type: 'short',
          answer: 'def'
        }
      ]
    }
  },
  {
    title: 'Advanced Node.js and Express',
    description: 'Build scalable backend applications with Node.js and Express. Learn REST APIs, authentication, and database integration.',
    category: 'backend development',
    level: 'advanced',
    visibility: 'published',
    lessons: [
      {
        title: 'Node.js Architecture Overview',
        type: 'video',
        order: 1,
        contentUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4'
      },
      {
        title: 'Express Routing and Middleware',
        type: 'text',
        order: 2,
        text: 'Express middleware functions have access to request and response objects, enabling powerful request processing. Middleware can be used for authentication, logging, data parsing, and more.'
      },
      {
        title: 'Building RESTful APIs',
        type: 'video',
        order: 3,
        contentUrl: 'https://www.youtube.com/embed/pKd0Rpw7O48'
      },
      {
        title: 'Authentication with JWT',
        type: 'text',
        order: 4,
        text: 'JSON Web Tokens provide a stateless authentication mechanism perfect for modern web applications. JWTs are secure, compact, and can carry user information in their payload.'
      },
      {
        title: 'MongoDB Integration with Mongoose',
        type: 'video',
        order: 5,
        contentUrl: 'https://www.youtube.com/embed/5e2cF0A5h6Y'
      },
      {
        title: 'Error Handling and Validation',
        type: 'text',
        order: 6,
        text: 'Proper error handling improves user experience and makes debugging easier. Always validate input data and return meaningful error messages to API consumers.'
      },
      {
        title: 'Deployment Best Practices',
        type: 'video',
        order: 7,
        contentUrl: 'https://www.youtube.com/embed/QJ-Vm7y7F2E'
      }
    ],
    quiz: {
      title: 'Node.js Advanced Quiz',
      questions: [
        {
          question: 'What is the event loop in Node.js?',
          type: 'mcq',
          options: [
            'A mechanism for handling asynchronous operations',
            'A type of database',
            'A security feature',
            'A logging system'
          ],
          answer: 0
        },
        {
          question: 'Express is a built-in Node.js module.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: false
        },
        {
          question: 'What does REST stand for?',
          type: 'short',
          answer: 'representational state transfer'
        }
      ]
    }
  },
  {
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design. Create intuitive, beautiful, and user-friendly designs.',
    category: 'design',
    level: 'beginner',
    visibility: 'published',
    lessons: [
      {
        title: 'What is UI/UX Design?',
        type: 'video',
        order: 1,
        contentUrl: 'https://www.youtube.com/embed/Ovj4hFxko7c'
      },
      {
        title: 'Design Thinking Process',
        type: 'text',
        order: 2,
        text: 'Design thinking involves empathizing with users, defining problems, ideating solutions, prototyping, and testing. This human-centered approach ensures you create products people love.'
      },
      {
        title: 'Color Theory and Typography',
        type: 'video',
        order: 3,
        contentUrl: 'https://www.youtube.com/embed/Qe3oJnFtA_k'
      },
      {
        title: 'Wireframing and Prototyping',
        type: 'text',
        order: 4,
        text: 'Wireframes are low-fidelity sketches. Prototypes are interactive mockups that simulate the final product. Both are essential tools in the design process.'
      },
      {
        title: 'User Research and Testing',
        type: 'video',
        order: 5,
        contentUrl: 'https://www.youtube.com/embed/2g9lsbJBPEs'
      }
    ],
    quiz: {
      title: 'UI/UX Design Quiz',
      questions: [
        {
          question: 'Which of these is NOT a principle of good UX design?',
          type: 'mcq',
          options: ['Usability', 'Accessibility', 'Complexity', 'Consistency'],
          answer: 2
        },
        {
          question: 'UI stands for User Interface and UX stands for User Experience.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: true
        },
        {
          question: 'What tool is commonly used for creating wireframes?',
          type: 'short',
          answer: 'figma'
        }
      ]
    }
  },
  {
    title: 'Data Science with Python',
    description: 'Dive into data analysis and machine learning with Python. Learn pandas, numpy, and scikit-learn for real-world applications.',
    category: 'data science',
    level: 'intermediate',
    visibility: 'published',
    lessons: [
      {
        title: 'Introduction to Data Science',
        type: 'video',
        order: 1,
        contentUrl: 'https://www.youtube.com/embed/ua-CiDNNj30'
      },
      {
        title: 'NumPy for Numerical Computing',
        type: 'text',
        order: 2,
        text: 'NumPy provides powerful array operations and mathematical functions essential for data analysis. It\'s the foundation of the scientific Python ecosystem.'
      },
      {
        title: 'Data Manipulation with Pandas',
        type: 'video',
        order: 3,
        contentUrl: 'https://www.youtube.com/embed/vmEHCJofslg'
      },
      {
        title: 'Data Visualization with Matplotlib',
        type: 'text',
        order: 4,
        text: 'Matplotlib creates publication-quality plots and charts to communicate insights effectively. Visualization is key to understanding data patterns.'
      },
      {
        title: 'Introduction to Machine Learning',
        type: 'video',
        order: 5,
        contentUrl: 'https://www.youtube.com/embed/KJj3gL6EPnY'
      },
      {
        title: 'Building Your First ML Model',
        type: 'text',
        order: 6,
        text: 'Use scikit-learn to build, train, and evaluate machine learning models on real datasets. Start with simple models like linear regression before moving to complex ones.'
      }
    ],
    quiz: {
      title: 'Data Science Quiz',
      questions: [
        {
          question: 'Which library is primarily used for data manipulation in Python?',
          type: 'mcq',
          options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
          answer: 1
        },
        {
          question: 'Machine learning requires labeled data for all types of learning.',
          type: 'boolean',
          options: ['True', 'False'],
          answer: false
        },
        {
          question: 'What does CSV stand for?',
          type: 'short',
          answer: 'comma separated values'
        }
      ]
    }
  }
];

async function seedCourses() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learnsphere';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Find or create an instructor
    let instructor = await User.findOne({ email: 'admin@example.com' });
    if (!instructor) {
      instructor = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        passwordHash: User.hashPassword('ChangeMe123!'),
        role: Roles.ADMIN
      });
      console.log('Created admin user');
    }

    // Clear existing courses, lessons, and quizzes
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    console.log('Cleared existing courses, lessons, and quizzes');

    // Create courses with lessons and quizzes
    for (const courseData of coursesData) {
      const { lessons, quiz, ...courseInfo } = courseData;

      // Create course
      const course = await Course.create({
        ...courseInfo,
        instructor: instructor._id
      });
      console.log(`Created course: ${course.title}`);

      // Create lessons
      for (const lessonData of lessons) {
        await Lesson.create({
          ...lessonData,
          course: course._id
        });
      }
      console.log(`  - Added ${lessons.length} lessons`);

      // Create quiz
      if (quiz) {
        await Quiz.create({
          ...quiz,
          course: course._id
        });
        console.log(`  - Added quiz: ${quiz.title}`);
      }
    }

    console.log('\n✅ Successfully seeded database with courses!');
    console.log(`Total courses created: ${coursesData.length}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
