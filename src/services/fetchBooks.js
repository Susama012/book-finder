export const fetchBooks = async (title = "programming") => {
  const response = await fetch(
    `https://openlibrary.org/search.json?title=${title}`
  );
  const data = await response.json();
  return data.docs;
};
