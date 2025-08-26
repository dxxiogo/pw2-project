export const globDirectory = "dist/";
export const globPatterns = ["**/*.{js,css,html,ico,png,svg,json}"];
export const swDest = "dist/sw.js";
export const navigateFallback = "/index.html";
export const runtimeCaching = [
  {
    urlPattern: ({ request }) => request.mode === "navigate",
    handler: "NetworkFirst",
    options: {
      cacheName: "pages-cache",
      expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
      cacheableResponse: { statuses: [200] },
    },
  },
  {
    // Cacheia qualquer requisição para a API, incluindo query params
    urlPattern: /^http:\/\/localhost:3001\/.*$/,
    handler: "NetworkFirst",
    options: {
      cacheName: "api-cache",
      expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
      cacheableResponse: { statuses: [200] },
    },
  },
];
