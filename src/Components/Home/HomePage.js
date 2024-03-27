import React from 'react';
import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';
import SideBar from '../Common/SideBar';
import ArticlesPage from '../Articles/ArticlesPage'
import { useAuthenticator, Alert } from '@aws-amplify/ui-react';

function HomePage() {
    const { route, user } = useAuthenticator((context) => [
        context.route,
    ]);
        return (
            <Container fluid className='px-1'>
                <Row className='font-weight-light'>
                    <Col className='context-col'>
                    <Alert className='alert'>
                        Welcome{user?.username? user?.username && '!' : '!'}<br/>
                        This platform offers unrestricted freedom of speech to everyone! You can sign up using your IP address and engage in discussions on any topic without fear of persecution.
                        We acknowledge that political parties and nations often manipulate news and facts to suit their agendas.
                        Therefore, seize this opportunity to express your views and ensure your voice is heard
                        loud and clear! {!user && <a href='/login'>Create your account to express your thoughts!</a>}
                    </Alert>
                        <ArticlesPage />
                     </Col>   
                    <Col className='side-bar-col' sm={2}>
                       <SideBar />    
                    </Col>
                </Row>
            </Container>
        );
    }

export default HomePage;