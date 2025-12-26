import axios from "axios";

// Define the logic here, away from your UI code
export const fetchHeroImages = async () => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  console.log("API Key:", apiKey); // Debugging line
  const requests = [
    axios.get(
      `${baseUrl}?q=subject:fiction&orderBy=newest&langRestrict=en&maxResults=1&key=${apiKey}`
    ),
    axios.get(
      `${baseUrl}?q=intitle:bestseller&orderBy=relevance&langRestrict=en&maxResults=1&key=${apiKey}`
    ),
    axios.get(
      `${baseUrl}?q=inauthor:Haruki+Murakami&orderBy=relevance&langRestrict=en&maxResults=1&key=${apiKey}`
    ),
    axios.get(
      `${baseUrl}?q=life+of+pi&orderBy=relevance&langRestrict=en&maxResults=1&key=${apiKey}`
    ),
  ];

  try {
    const [newReleasesRes, topBooksRes, topAuthorsRes, bestseller] =
      await Promise.all(requests);

    // Helper to clean up the image URL
    const getImage = (response) => {
      const img = response.data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
      return img
        ? img
            .replace("http:", "https:")
            .replace("&edge=curl", "")
            .replace("zoom=1", "zoom=0")
        : "https://via.placeholder.com/600";
    };

    return {
      newReleases: getImage(newReleasesRes),
      topBooks: getImage(topBooksRes),
      topAuthors: getImage(topAuthorsRes),
      bestSellers: getImage(bestseller),
    };
  } catch (error) {
    console.error("Error in bookService:", error);
    return { newReleases: "", topBooks: "", topAuthors: "" }; // Fallback
  }
};
