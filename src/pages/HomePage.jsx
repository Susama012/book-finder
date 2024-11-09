import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { fetchBooks } from "../services/fetchBooks";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [dropdownSuggestions, setDropdownSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("title");

  useEffect(() => {
    const loadInitialBooks = async () => {
      setLoading(true);
      const initialBooks = await fetchBooks();
      setBooks(initialBooks);
      setFilteredBooks(initialBooks);
      setLoading(false);
    };
    loadInitialBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      let suggestions = [];
      if (filterCategory === "title") {
        suggestions = books
          .filter((book) =>
            book.title?.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((book) => book.title);
      } else if (filterCategory === "author") {
        suggestions = books
          .flatMap((book) => book.author_name || [])
          .filter((author) =>
            author.toLowerCase().includes(searchTerm.toLowerCase())
          );
      } else if (filterCategory === "publisher") {
        suggestions = books
          .flatMap((book) => book.publisher || [])
          .filter((pub) =>
            pub.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      setDropdownSuggestions([...new Set(suggestions)].slice(0, 10));
    } else {
      setDropdownSuggestions([]);
      setFilteredBooks(books);
    }
  };

  const executeSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = books.filter((book) => {
        if (filterCategory === "title") {
          return book.title?.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (filterCategory === "author") {
          return book.author_name?.some((author) =>
            author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else if (filterCategory === "publisher") {
          return book.publisher?.some((pub) =>
            pub.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return false;
      });
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
    setDropdownSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8">Book Finder</h1>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        <SearchBar
          onSearch={handleSearch}
          onExecuteSearch={executeSearch}
          dropdownSuggestions={dropdownSuggestions}
          filterCategory={filterCategory}
          onFilterCategoryChange={setFilterCategory}
        />
      </div>

      {loading ? (
        <div className="loading-screen">Loading books...</div>
      ) : (
        <BookList books={filteredBooks} />
      )}
    </div>
  );
};

export default HomePage;
