import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BookList from "./components/BookList";
function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja's reading list</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
