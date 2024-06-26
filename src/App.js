import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { useEffect } from 'react';
import NavigationBar from './components/Common/NavigationBar';
import FooterBar from './components/Common/FooterBar ';
import HomePage from './components/Home/HomePage';
import {Login} from './components/Auth/Login';
import Profile from './components/Home/Profile';
import DebatesPage from './components/Home/DebatesPage';


import { Route, Routes } from 'react-router-dom';
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';

import { Amplify } from 'aws-amplify';


import { AuthModeStrategyType } from 'aws-amplify/datastore';
import { Authenticator, useTheme, Text  } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';

import './App.css';
import '@aws-amplify/ui-react/styles.css';
import ArgumentsPage from './components/Arguments/ArgumentsPage';
import AboutPage from './components/About/AboutPage';
import Topic from './components/Topics/TopicPage';

import { RequireAuth } from './components/Auth/RequireAuth';
import { Layout } from './components/Common/Layout';
import {
  fetchAuthSession,
  getCurrentUser
} from 'aws-amplify/auth';

const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
const getAuthenticatedUser = async () => {
  const {
    username,
    signInDetails
  } = await getCurrentUser();

  const {
    tokens: session
  } = await fetchAuthSession();

  // Note that session will no longer contain refreshToken and clockDrift
  return {
    username,
    session,
    authenticationFlowType: signInDetails.authFlowType
  };
}
Amplify.configure(awsExports, {
  API: {
    REST: {
      headers: async () => {
        return { Authorization: authToken };
      }
    }
  }
});

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const showNav = searchParams.get('nav')!='false' ? true : false ;

  const assessLoggedInState = () => {
    getAuthenticatedUser()
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
          await Amplify.Auth.signOut();
          setLoggedIn(false);
      } catch (error) {
          console.log('error signing out: ', error);
      }
  };

  return (

    <Authenticator.Provider>
      <div>
       <NavigationBar showNav={showNav} signOut={signOut} loggedIn={loggedIn}/>
      <Container fluid className='my-5 app-body'>
                <Row >
                    <Col sm={12} className='page-context'>
                      <Routes>
                      <Route element={<Layout />}>
                        <Route index path='/' exact={true} element = {<HomePage/>} />
                        <Route path='/login' element = {<Login/>} />
                        <Route path="/profile/:name?" element = {<Profile />} />
                        <Route path='/topic/:owner?' element = {<Topic />} />
                        <Route path='/arguments' element = {<ArgumentsPage/>} />
                        <Route path='/politics' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/sports' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/religion' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/health' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/debates' element = {<RequireAuth><DebatesPage /></RequireAuth>} />
                        <Route path='/about' element = {<AboutPage />}></Route>
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