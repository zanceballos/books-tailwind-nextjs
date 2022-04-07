export default async function handler({ query: { query } }, res) {
  const data = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&orderBy=newest&key=AIzaSyC-123qM3DWjNCd22SXuyaqTXwVW3uswkY&country=SG`
  );
  const json = await data.json();
  res.status(200).json(json);
}
