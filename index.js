addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch('https://example.com/')

  // transformer that upper-cases, this will probably corrupt non-string data ;)
  const transformer = {
    async transform(chunk, controller) {
      // decode the byte stream, uppercase the characters, re-encode and enqueue data
      const decoded = new TextDecoder().decode(chunk)
      const upper = decoded.toUpperCase()
      const reencoded = new TextEncoder().encode(upper)
      controller.enqueue(reencoded)
    },
  }

  // reproduce https://github.com/cloudflare/miniflare/issues/168
  // Miniflare will use the transformer argument while the Cloudflare Worker runtime will not.
  const { readable, writable } = new TransformStream(transformer)
  response.body.pipeTo(writable)
  return new Response(readable, response)
}
