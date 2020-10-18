const API_KEY = process.env.VUE_APP_API_KEY;

export const API = {
  ASTEROIDS: `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=12&api_key=${API_KEY}`,
  ASTEROIDS_DATE_SEARCH: `https://api.nasa.gov/neo/rest/v1/feed?detailed=true&api_key=${API_KEY}`,
  ASTEROID_FIND: id => `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
}

export const COLORS = {
  ASTEROIDS: '#fc6035',
  SEARCH: '#fc35a3',
  FIND: '#6de15f',
  FAVORITES: '#35a0fc',
  AUTH: '#ffe11a'
}