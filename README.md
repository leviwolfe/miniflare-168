# Note

Created via `wrangler generate miniflare-168 https://github.com/cloudflare/worker-template` to reproduce https://github.com/cloudflare/miniflare/issues/168

- [index.js](index.js) defines a simple worker to fetch https://example.com/ and use TransformStream to uppercase the response.
- Running `npm run miniflare` will launch the worker in Miniflare and the response will be uppercased.
- Running `wrangler dev` will launch the worker in Wrangler and the response will not be uppsercased.
