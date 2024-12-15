import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_USESR = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  const { data, error, loading } = useQuery(GET_USESR);
  if (loading) return <p>Loading</p>;
  if (error) return <p>error: {error.message}</p>;

  return (
    <div>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((user) => (
          <h2>{user.name}</h2>
        ))}
      </div>
    </div>
  );
};

export default App;
