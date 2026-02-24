export const simulateLatency = (min = 100, max = 400) => {
  const delay = Math.floor(Math.random() * (max - min) + min)
  return new Promise((resolve) => setTimeout(resolve, delay))
}
