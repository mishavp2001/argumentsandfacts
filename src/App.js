import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Authenticator,
  Heading
} from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import Notes from "./components/Notes"

const Title = styled("h1")`
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
  color: #74b49b;
  font-size: 24px;
`;

const App = ({ signOut }) => {
 
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);



  
  return state.isLoggedIn ? (
    <Notes />
  ) : (
    <>
      <Title>Articles</Title>
      <Heading level={1}>This platform offers unrestricted freedom of speech to everyone, free of charge! You can sign up using your IP address and engage in discussions on any topic without fear of persecution. We acknowledge that political parties and nations often manipulate news and facts to suit their agendas. Therefore, seize this opportunity to express your views and ensure your voice is heard loud and clear!
      </Heading>
      <Authenticator
       socialProviders={['amazon', 'apple', 'facebook', 'google']}
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
      />
    </>
  );
};

export default App;