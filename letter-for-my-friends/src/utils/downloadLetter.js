import html2canvas from 'html2canvas'

/**
 * Renders a DOM node to a PNG and triggers a browser download.
 *
 * @param {HTMLElement} node - the element to capture (e.g. the letter card ref)
 * @param {string} fileName - download file name, without extension
 */
export async function downloadNodeAsImage(node, fileName = 'my-letter') {
  if (!node) return

  const canvas = await html2canvas(node, {
    backgroundColor: '#FBF6EE',
    scale: Math.min(3, window.devicePixelRatio * 2 || 2),
    useCORS: true,
    logging: false,
  })

  const dataUrl = canvas.toDataURL('image/png', 1.0)

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${fileName}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
