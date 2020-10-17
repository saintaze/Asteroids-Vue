const API_KEY = 'PTBVCqGiwFzHBdtPO2duHxJ1qlQRUwUndA2KwJ7b';

export const API = {
  ASTEROIDS: `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=12&api_key=${API_KEY}`,
  ASTEROIDS_DATE_SEARCH: `https://api.nasa.gov/neo/rest/v1/feed?detailed=true&api_key=${API_KEY}`,
  ASTEROID_FIND: id => `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
}

// export const API_ENDPOINT_ASTEROIDS = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=12&api_key=${API_KEY}`;
// export const API_ENDPOINT__ASTEROIDS_DATE = `https://api.nasa.gov/neo/rest/v1/feed?detailed=true&api_key=${API_KEY}`;

export const COLORS = {
  ASTEROIDS: '#fc6035',
  SEARCH: '#fc35a3',
  FIND: '#ffdb64',
  FAVORITES: '#35a0fc',
  AUTH: '#9c1dfc'
}