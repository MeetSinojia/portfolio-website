/* Service Worker API simulator: serves /api/* endpoints from inlined data */
"use strict";

// Import modular helpers (served from /lib)
importScripts('/lib/fakeLatency.js', '/lib/rateLimiter.js', '/lib/data.js');

// alias for clarity inside the SW
const simulateLatency = self.simulateLatency;
const checkRateLimit = self.checkRateLimit;
const DATA = self.PORTFOLIO_DATA || {};

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
  const url = new URL(event.request.url)
  if (!url.pathname.startsWith('/api/')) return

  event.respondWith((async () => {
    try {
      // rate limiting: try per-client first (event.clientId). Falls back to global.
      const clientId = event.clientId ? String(event.clientId) : 'global'
      if (!checkRateLimit(clientId, 50, 10000)) {
        await simulateLatency(80, 160)
        return jsonResponse({ error: 'Too Many Requests' }, 429)
      }

      const parts = url.pathname.replace(/^\/api\//, '').split('/').filter(Boolean)
      if (parts.length === 0) return jsonResponse({ routes: ['/api/about','/api/experience','/api/projects','/api/metrics','/api/hire','/api/login'] })

      const method = event.request.method || 'GET'
      const root = parts[0]

      // Simulate latency for realism
      await simulateLatency(120, 360)

      if (root === 'about' || root === 'whoami') {
        return jsonResponse({ ...DATA.whoami, response_time_ms: 0 })
      }

      if (root === 'experience') {
        return jsonResponse({ experience: DATA.experience })
      }

      if (root === 'projects') {
        if (parts.length === 1) return jsonResponse({ projects: DATA.projects })
        const id = parts[1]
        const p = DATA.projects.find(x => x.id === id || String(x.id) === id)
        if (p) return jsonResponse(p)
        return jsonResponse({ error: 'project not found' }, 404)
      }

      if (root === 'skills') {
        return jsonResponse({ skills: DATA.skills })
      }

      if (root === 'achievements') {
        return jsonResponse({ achievements: DATA.achievements })
      }

      if (root === 'metrics') {
        return jsonResponse({
          dsa_problems_solved: 1020,
          leetcode_rating: 1930,
          codechef_rating: 1606,
          codeforces_rating: 1284
        })
      }

      if (root === 'hire' && method === 'POST') {
        // accept JSON body
        try {
          const body = await event.request.json()
          return jsonResponse({ status: 'Accepted', message: `Thank you ${body.company || '—'}. Meet is ready to build scalable systems.` })
        } catch (e) {
          return jsonResponse({ error: 'invalid json' }, 400)
        }
      }

      if (root === 'login' && method === 'POST') {
        // return a fake JWT token
        const token = 'ey.fake.jwt.' + Math.random().toString(36).slice(2)
        return jsonResponse({ token, issued_at: Date.now() })
      }

      return jsonResponse({ error: 'unknown endpoint' }, 404)
    } catch (err) {
      return jsonResponse({ error: err.message }, 500)
    }
  })())
})
