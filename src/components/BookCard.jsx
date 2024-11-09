import React from "react";

const BookCard = ({ book }) => {
  const { cover_i, title, author_name, publisher } = book;
  const rating = 3;

  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
    : "https://via.placeholder.com/150";

  const publisherText =
    publisher && publisher.length > 2
      ? `${publisher.slice(0, 2).join(", ")}...`
      : publisher
      ? publisher.join(", ")
      : "N/A";

  // Star rating display
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span className="text-yellow-500">
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </span>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 sm:p-3 md:p-2 transition transform hover:scale-105 duration-300">
      <img
        src={coverUrl}
        alt={`${title} cover`}
        className="w-full h-32 sm:h-40 md:h-44 object-cover rounded-md mb-3"
      />
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1">{title}</h3>
      <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-1">
        Author: {author_name ? author_name.join(", ") : "Unknown"}
      </p>
      <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-1">
        Publisher: {publisherText}
      </p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        <span className="text-xs sm:text-sm md:text-base text-gray-700 mr-2">Rating:</span>
        {renderStars()}
        <span className="ml-1 text-xs sm:text-sm md:text-base text-gray-600">
          ({rating}/5)
        </span>
      </div>
    </div>
  );
};

export default BookCard;
