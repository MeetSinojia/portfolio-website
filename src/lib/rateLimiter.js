let requestCount = 0
let lastReset = Date.now()

export function checkRateLimit(limit = 5, windowMs = 10000) {
  const now = Date.now()
  if (now - lastReset > windowMs) {
    requestCount = 0
    lastReset = now
  }
  requestCount++
  if (requestCount > limit) return false
  return true
}
