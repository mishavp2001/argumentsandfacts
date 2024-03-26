import React from 'react';
import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';
import SideBar from '../Common/SideBar';
import ArticlesPage from '../Articles/ArticlesPage'
import { useAuthenticator, Alert } from '@aws-amplify/ui-react';

function DebatesPage() {

    const AuthContext = useAuthenticator((context) => [context]);
        return (
            <Container fluid className='px-1 context-container'>
                <Row className='font-weight-light'>
                    <Col className='context-col'>
                    Debates
                     </Col>   
                    <Col className='side-bar-col' sm={2}>
                       <SideBar />    
                    </Col>
                </Row>
            </Container>
        );
    }

export default DebatesPage;