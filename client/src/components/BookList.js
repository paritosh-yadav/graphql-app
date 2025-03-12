import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import { useState } from "react";
import BookDetails from "./BookDetails";

function BookList() {
  const [selectedBook, setSelectedBook] = useState(null);
  const { data, loading } = useQuery(getBooksQuery);
  const renderBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={() => {
              setSelectedBook(book.id);
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };
  return (
    <div>
      <ul id="book-list">{renderBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
}

export default BookList;
