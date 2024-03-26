import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { useEffect } from 'react';
import NavigationBar from './Components/Common/NavigationBar';
import FooterBar from './Components/Common/FooterBar ';
import HomePage from './Components/Home/HomePage';
import {Login} from './Components/Auth/Login';
import Profile from './Components/Home/Profile';
import DebatesPage from './Components/Home/DebatesPage';

import { Route, Routes } from 'react-router-dom';
import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';

import { Amplify, AuthModeStrategyType, Auth, Storage } from 'aws-amplify';
import { Authenticator, useTheme, Text  } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import './App.css';
import '@aws-amplify/ui-react/styles.css';
import ArticlesPage from './Components/Articles/ArticlesPage';
import { RequireAuth } from './Components/Auth/RequireAuth';
import { Layout } from './Components/Common/Layout';

Amplify.configure({
  ...awsExports,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }}
);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const assessLoggedInState = () => {
      Auth.currentAuthenticatedUser()
          .then(sess => {
              console.log('logged in');
              setLoggedIn(true);
          })
          .catch(() => {
              console.log('not logged in');
              setLoggedIn(false);
          });
  };
  useEffect(() => {
      assessLoggedInState();
  }, []);

  const signOut = async () => {
      try {
          await Auth.signOut();
          setLoggedIn(false);
      } catch (error) {
          console.log('error signing out: ', error);
      }
  };

  return (
    <Authenticator.Provider>
      <div>
      <NavigationBar signOut={signOut} loggedIn={loggedIn}/>
      <Container fluid className='my-5 app-body'>
                <Row >
                    <Col sm={12}>
                      <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index path='/' exact={true} element = {<HomePage/>} />
                        <Route path='/login' element = {<Login/>} />
                        <Route path='/profile' element = {<Profile />} />
                        <Route path='/articles' element = {<ArticlesPage/>} />
                        <Route path='/politics' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/sports' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/religion' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/health' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/debates' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                      </Route>  
                  </Routes>
                  </Col>
                </Row>
      </Container>
      <FooterBar/>
      </div>
    </Authenticator.Provider>
  );
}

export default App;