// Expose simulateLatency to service worker scope
(function(){
  self.simulateLatency = function(min = 100, max = 400){
    const delay = Math.floor(Math.random() * (max - min) + min)
    return new Promise((res) => setTimeout(res, delay))
  }
})();
