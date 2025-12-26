const dev = process.env.NODE_ENV != 'production'
export const server = process.env.NODE_ENV === 'production' ? 'https://warm-entremet-2aa841.netlify.app': 'http://localhost:3000'
console.log(process.env.NODE_ENV) 