import React, { Component } from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Profile(props) {
    const { user } = useAuthenticator((context) => [context.user]);
    const { name, type } = useParams();
    return (
        <Container fluid className='px-5 my-5 generic-container'>
            <Row style={{ 'marginTop': '6rem' }}>
                <Col>
                    Welcome {user?.username}
                    {name} - {type}
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;