import { gql, useQuery } from "@apollo/client";
import React from "react";

const GET_USER = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const App = () => {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USER);
  const {
    data: getUsersByIdData,
    error: getUsersEByIdrror,
    loading: getUsersByIdLoading,
  } = useQuery(GET_USER_BY_ID, { variables: { id: "2" } });

  if (getUsersLoading) return <p>Loading</p>;
  if (getUsersError) return <p>error: {getUsersError.message}</p>;

  return (
    <div>
      <div>
        {getUsersByIdLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Selected User: {getUsersByIdData.getUserById.name}</p>
          </>
        )}
      </div>
      <h1>Users</h1>
      <div>
        {getUsersData.getUsers.map((user) => (
          <h2>{user.name}</h2>
        ))}
      </div>
    </div>
  );
};

export default App;
