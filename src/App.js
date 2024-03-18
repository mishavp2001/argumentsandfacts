import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Authenticator,
  Alert,
  Button,
  Grid,
  Flex,
  useTheme,
  View

} from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import Notes from "./components/Notes"

const Title = styled("h1")`
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
  color: #74b49b;
  font-size: 24px;
`;

const SignOutButton = styled(Button)`
background-color: #74b49b;
cursor: pointer;
`;

const App = () => {
  const { tokens } = useTheme();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return user ? (
    <>
      <SignOutButton
        onClick={() => {
          signOut().then(() => window.location.reload());
        }}
      >
        Sign Out
      </SignOutButton>
      <Notes />
    </>

  ) : (
    <>
      <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
        <Flex
          direction='column'
          backgroundColor="hsl(185.69deg 19.2% 52.67%"
          justifyContent="center"
        >
          <Alert style={{ backgroundColor: 'yellow', 'margin': '20px' }}>
            <h3>This platform offers unrestricted freedom of speech to everyone! You can sign up using your IP address and engage in discussions on any topic without fear of persecution. <br />
              We acknowledge that political parties and nations often manipulate news and facts to suit their agendas.
              Therefore, seize this opportunity to express your views and ensure your voice is heard
              loud and clear!</h3>
          </Alert>
          <Authenticator
            socialProviders={['amazon', 'apple', 'facebook', 'google']}
          />  
        </Flex>
        <View height="100vh" padding="20px" width="fit-content">
          <Notes />
        </View>
      </Grid>
    </>
  );
};

export default App;