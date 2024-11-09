import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 p-2 sm:p-4">
      {books.length ? (
        books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))
      ) : (
        <p className="text-center text-gray-600">No books found.</p>
      )}
    </div>
  );
};

export default BookList;
