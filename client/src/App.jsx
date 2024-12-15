import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

const App = () => {
  const [newUser, setNewUser] = useState({});

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

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p>Loading</p>;
  if (getUsersError) return <p>error: {getUsersError.message}</p>;

  const handleCreateUser = async () => {
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
    console.log(newUser);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}>Submit</button>
      </div>
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
