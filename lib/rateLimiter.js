// Simple in-memory rate limiter helper usable from the service worker
(function(){
  // per-client in-memory rate limiter for demo (keyed by clientId)
  self.__rlClients = self.__rlClients || {}

  // Usage:
  // checkRateLimit(clientId, limit, windowMs)
  // or checkRateLimit(limit, windowMs) for global
  self.checkRateLimit = function(arg1, arg2, arg3){
    let clientId = 'global'
    let limit = 20
    let windowMs = 10000

    if (typeof arg1 === 'string') {
      clientId = arg1
      limit = typeof arg2 === 'number' ? arg2 : limit
      windowMs = typeof arg3 === 'number' ? arg3 : windowMs
    } else if (typeof arg1 === 'number') {
      limit = arg1
      windowMs = typeof arg2 === 'number' ? arg2 : windowMs
    }

    const now = Date.now()
    let state = self.__rlClients[clientId]
    if (!state) { state = { count: 0, lastReset: now }; self.__rlClients[clientId] = state }

    if (now - state.lastReset > windowMs) {
      state.count = 0
      state.lastReset = now
    }

    state.count += 1
    return state.count <= limit
  }

  self.getRateState = function(clientId = 'global'){
    const s = self.__rlClients[clientId] || { count: 0, lastReset: 0 }
    return { clientId, count: s.count, lastReset: s.lastReset }
  }
})();
