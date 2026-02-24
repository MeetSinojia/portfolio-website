/* Service Worker API simulator: serves /api/* endpoints with inlined data */
"use strict";

// Inlined portfolio data
const PORTFOLIO_DATA = {
  whoami: {
    name: "Meet Sinojia",
    title: "Backend Engineer — Systems & APIs",
    company: "UBS",
    location: "Pune, India",
    bio: "Building reliable production systems with Python, Golang, and Node.js. I work on backend architecture, data-heavy workflows, and high-performance APIs.",
    links: {
      linkedin: "https://linkedin.com/in/meet-sinojia",
      github: "https://github.com/meet-sinojia",
      leetcode: "https://leetcode.com/meet-sinojia"
    }
  },
  experience: [
    {
      role: "Software Engineer",
      company: "UBS",
      location: "Pune, India",
      start: "Feb 2024",
      end: "Present",
      bullets: [
        "Optimized Data Quality Checks (DQC) for large-scale data processing (100GB+ monthly) using Python, NumPy, and Pandas",
        "Improved efficiency by reducing processing time by 10%, minimizing false data, and streamlining workflows",
        "Enhanced Data API by adding pagination and rate limiting, reducing average data fetch time from 10s to 2s",
        "Collaborated with front-end developers to integrate APIs with React-based internal dashboards",
        "Implemented role-based and user-specific access control using JWT authentication"
      ],
      tech: ["Python", "SQL", ".NET", "C#", "Angular", "Java"]
    },
    {
      role: "Prism Developer",
      company: "Samsung R&D India",
      location: "Remote",
      start: "Dec 2022",
      end: "Aug 2023",
      bullets: [
        "Collaborated on a UWB human angle detection system, achieving 86% accuracy using MUSIC and ESPRIT algorithms",
        "Analyzed a dataset of 12,000 UWB images to enhance data-driven outcomes and project impact"
      ],
      tech: ["Python", "Signal Processing"]
    }
  ],
  projects: [
    {
      id: "mr-mechanic",
      name: "Mr. Mechanic",
      description: "Built a full-stack vendor management system supporting billing and inventory operations. Designed and implemented REST APIs using Golang (Gin) with JWT authentication and OTP verification via MSG91. Deployed backend services on Render with AWS RDS and S3 for scalable data and image storage. Published the mobile application on Google Play Store, handling production builds, releases, and updates.",
      tech: ["Flutter", "Golang", "Gin", "MySQL", "AWS"],
      links: {
        github: "https://github.com/MeetSinojia/mr_mechanics_demo",
        demo: "https://github.com/MeetSinojia/mr_mechanics_demo"
      }
    },
    {
      id: "echoshop",
      name: "EchoShop",
      description: "Developed a full-stack e-commerce platform with secure Stripe-based payment integration. Optimized delivery routing using Dijkstra's algorithm with real-time location data integration.",
      tech: ["React.js", "Node.js", "Firebase", "Stripe", "HTML", "CSS", "JavaScript"],
      links: {
        github: "https://github.com/MeetSinojia/EchoShop",
        demo: "https://github.com/MeetSinojia/EchoShop"
      }
    }
  ],
  skills: {
    languages: ["Python", "Golang", "JavaScript", "C++", "Java", "SQL"],
    frameworks: ["React.js", "Node.js", "Flask", "Gin", ".NET"],
    tools: ["AWS", "Firebase", "Git", "Docker", "Postman", "MySQL"]
  },
  achievements: [
    {
      title: "Knight on LeetCode",
      description: "Highest rating of 1930+ (Top 5%)"
    },
    {
      title: "3 Star on CodeChef",
      description: "Highest rating of 1606"
    },
    {
      title: "Pupil on Codeforces",
      description: "Highest rating of 1284"
    },
    {
      title: "Binance Ideathon",
      description: "Runner Up in 'Blockchain for Good' 2022"
    }
  ]
};

// Rate limiting
const rateLimitStore = {};

function checkRateLimit(clientId, maxRequests, windowMs) {
  const now = Date.now();
  if (!rateLimitStore[clientId]) {
    rateLimitStore[clientId] = [];
  }

  const requests = rateLimitStore[clientId];
  const validRequests = requests.filter(time => now - time < windowMs);

  if (validRequests.length >= maxRequests) {
    return false;
  }

  validRequests.push(now);
  rateLimitStore[clientId] = validRequests;
  return true;
}

// Simulate latency
async function simulateLatency(min, max) {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
}

function jsonResponse(obj, status = 200) {
  return new Response(JSON.stringify(obj, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith('/api/')) return;

  event.respondWith((async () => {
    try {
      const clientId = event.clientId ? String(event.clientId) : 'global';
      if (!checkRateLimit(clientId, 50, 10000)) {
        await simulateLatency(80, 160);
        return jsonResponse({ error: 'Too Many Requests' }, 429);
      }

      const parts = url.pathname.replace(/^\/api\//, '').split('/').filter(Boolean);
      if (parts.length === 0) {
        return jsonResponse({
          routes: ['/api/whoami', '/api/experience', '/api/projects', '/api/skills', '/api/achievements', '/api/metrics']
        });
      }

      const method = event.request.method || 'GET';
      const root = parts[0];

      await simulateLatency(120, 360);

      if (root === 'whoami' || root === 'about') {
        return jsonResponse({ ...PORTFOLIO_DATA.whoami });
      }

      if (root === 'experience') {
        return jsonResponse({ experience: PORTFOLIO_DATA.experience });
      }

      if (root === 'projects') {
        if (parts.length === 1) return jsonResponse({ projects: PORTFOLIO_DATA.projects });
        const id = parts[1];
        const p = PORTFOLIO_DATA.projects.find(x => x.id === id || String(x.id) === id);
        if (p) return jsonResponse(p);
        return jsonResponse({ error: 'project not found' }, 404);
      }

      if (root === 'skills') {
        return jsonResponse({ skills: PORTFOLIO_DATA.skills });
      }

      if (root === 'achievements') {
        return jsonResponse({ achievements: PORTFOLIO_DATA.achievements });
      }

      if (root === 'metrics') {
        return jsonResponse({
          dsa_problems_solved: 1003,
          projects_completed: 15,
          contributions_total: 342,
          code_reviews: 87,
          leetcode_rating: 1930,
          codechef_rating: 1606,
          codeforces_rating: 1284,
          uptime_maintained: 99.8,
          performance_improvement: 87,
          deployment_success_rate: 98.5,
          team_satisfaction: 4.9
        });
      }

      return jsonResponse({ error: 'unknown endpoint' }, 404);
    } catch (err) {
      return jsonResponse({ error: err.message }, 500);
    }
  })());
});
