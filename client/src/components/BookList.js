import { useQuery, gql } from "@apollo/client";
const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
function BookList() {
  const { data, loading } = useQuery(getBookQuery);
  const renderBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  };
  return (
    <div>
      <ul id="book-list">{renderBooks()}</ul>
    </div>
  );
}

export default BookList;
