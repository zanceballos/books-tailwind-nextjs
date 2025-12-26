export default async function handler({ query: { bookid } }, res) {
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookid}?projection=full&key=${process.env.GOOGLE_BOOKS_API_KEY}&country=SG`
    );
    const json = await data.json();
    res.status(200).json(json);
  }
  