// Shared portfolio data for the SW /api simulation
(function(){
  self.PORTFOLIO_DATA = {
    whoami: {
      name: 'Meet Sinojia',
      title: 'Software Engineer — Mobile & Web',
      company: 'UBS',
      location: 'Pune, Maharashtra, India',
      email: 'sinojiameet321@gmail.com',
      phone: '+91 9426377084',
      education: 'Vellore Institute of Technology (VIT Chennai) - B.Tech CS, CGPA: 8.66/10',
      links: {
        linkedin: 'https://linkedin.com/in/meet-sinojia',
        github: 'https://github.com/meet-sinojia',
        leetcode: 'https://leetcode.com/meet-sinojia'
      }
    },
    skills: {
      languages: ['C++', 'Python', 'Golang', 'Java', 'JavaScript', 'Dart'],
      frameworks: ['Gin', 'Node.js', '.NET', 'Flutter', 'Spring Boot', 'React', 'Angular'],
      tools: ['SQL', 'Git', 'Unix', 'Data Structures & Algorithms', 'OOP', 'OS', 'DBMS']
    },
    projects: [
      {
        id: 'mr-mechanic',
        name: 'Mr. Mechanic',
        tech: ['Flutter', 'Golang', 'Gin', 'MySQL', 'AWS'],
        repo: 'https://github.com/MeetSinojia/mr_mechanics_demo',
        description: 'Built a full-stack vendor management system supporting billing and inventory operations. Designed and implemented REST APIs using Golang (Gin) with JWT authentication and OTP verification via MSG91. Deployed backend services on Render with AWS RDS and S3 for scalable data and image storage. Published the mobile application on Google Play Store, handling production builds, releases, and updates.'
      },
      {
        id: 'echoshop',
        name: 'EchoShop',
        tech: ['React.js', 'Node.js', 'Firebase', 'Stripe'],
        repo: 'https://github.com/MeetSinojia/EchoShop',
        description: 'Developed a full-stack e-commerce platform with secure Stripe-based payment integration. Optimized delivery routing using Dijkstra\'s algorithm with real-time location data integration.'
      }
    ],
    achievements: [
      { title: 'Knight on LeetCode', detail: 'Top 5%, highest rating 1930+' },
      { title: 'CodeChef 3 coder', detail: 'Top 10%, highest rating 1606' },
      { title: 'Codeforces Pupil', detail: 'Highest rating 1284, Rank 1098 in CF Round 859' },
      { title: 'Runner-up Binance Ideathon 2022', detail: 'Blockchain for Good' }
    ],
    experience: [
      {
        role: 'Software Engineer',
        company: 'UBS',
        location: 'Pune, India',
        start: 'Feb 2024',
        end: 'Current',
        bullets: [
          'Optimized large-scale Data Quality Check (DQC) pipelines processing 100GB+ data/month using Python, NumPy, Pandas, reducing processing time by 10%',
          'Integrated backend APIs with React-based internal dashboards, improving data accessibility and workflow efficiency',
          'Improved Data API performance by implementing pagination and rate limiting, reducing query response time from 10s to 2s',
          'Designed and developed APIs for file-based data exchange, improving scalability and reliability',
          'Implemented role-based and user-specific access control using JWT authentication, strengthening API security',
          'Built file import connectors and automated Python tasks as part of UBS–Credit Suisse merger in NeoXam',
          'Tech Stack: Python, SQL, .NET, C#, Angular, NeoXam, Java, Autosys'
        ]
      },
      {
        role: 'Prism Developer',
        company: 'Samsung R&D India',
        location: 'Remote',
        start: 'Dec 2022',
        end: 'Aug 2023',
        bullets: [
          'Developed a UWB-based human angle detection system achieving 86% accuracy using MUSIC and ESPRIT algorithms',
          'Processed and analyzed 12,000+ UWB images to improve model accuracy and data-driven outcomes',
          'Tech Stack: Python, Signal Processing'
        ]
      }
    ],
    contact: {
      email: 'sinojiameet321@gmail.com',
      phone: '+91 9426377084',
      location: 'Pune, Maharashtra, India'
    }
  }
})();
