const dev = process.env.NODE_ENV != 'production'
export const server = process.env.NODE_ENV === 'production' ? 'https://bookify-owl.netlify.app/': 'http://localhost:3000'
console.log(process.env.NODE_ENV) 