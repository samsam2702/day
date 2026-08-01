/**
 * Generates an array of sparkle descriptors with randomized
 * position, size, and animation delay — used by <FloatingSparkles />.
 * Pure function, no DOM access, safe for SSR-less Vite.
 *
 * @param {number} count
 * @returns {{id:number, top:string, left:string, size:number, delay:string, duration:string}[]}
 */
export function generateSparkles(count = 18) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 5,
    delay: `${(Math.random() * 4).toFixed(2)}s`,
    duration: `${(3 + Math.random() * 3).toFixed(2)}s`,
  }))
}
