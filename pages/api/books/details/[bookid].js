export default async function handler({ query: { bookid } }, res) {
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookid}?projection=full&key=AIzaSyC-123qM3DWjNCd22SXuyaqTXwVW3uswkY&country=SG`
    );
    const json = await data.json();
    res.status(200).json(json);
  }
  