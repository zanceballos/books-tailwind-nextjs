export default async function handler({ query: { query } }, res) {
  const data = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&orderBy=newest&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );
  const json = await data.json();
  if (json.items) {

    // Sort by newest first
    json.items.sort((a, b) => {
      const dateA = new Date(a.volumeInfo.publishedDate || "1000"); 
      const dateB = new Date(b.volumeInfo.publishedDate || "1000");
      return dateB - dateA;
    });

    json.items = json.items.map((book) => {
      if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
        let imageUrl = book.volumeInfo.imageLinks.thumbnail;
        imageUrl = imageUrl.replace("http:", "https:");
        book.volumeInfo.imageLinks.thumbnail = imageUrl;
      }
      return book;
    });

    res.status(200).json(json);
  }
}
