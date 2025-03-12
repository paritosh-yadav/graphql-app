import { useQuery, useMutation } from "@apollo/client";
import {
  addBookMutation,
  getAuthorsQuery,
  getBooksQuery,
} from "../queries/queries";
import { useState } from "react";

function AddBook() {
  const [newBook, setNewBook] = useState({});
  const { data: { authors } = { authors: [] }, loading: loadingAuthors } =
    useQuery(getAuthorsQuery);

  const [addBook, { data, loading, error }] = useMutation(addBookMutation, {
    refetchQueries: [getBooksQuery],
  });

  const renderAuthors = () => {
    if (loadingAuthors) {
      return <option>Loading authors...</option>;
    } else {
      return authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
    });
  };
  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => {
            setNewBook((prevBook) => {
              return { ...prevBook, name: e.target.value };
            });
          }}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            setNewBook((prevBook) => {
              return { ...prevBook, genre: e.target.value };
            });
          }}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => {
            setNewBook((prevBook) => {
              return { ...prevBook, authorId: e.target.value };
            });
          }}
        >
          <option>Select author</option>
          {renderAuthors()}
        </select>
      </div>
      <button>+</button>
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Adding book...</p>}
    </form>
  );
}

export default AddBook;
