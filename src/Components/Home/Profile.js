import React, { Component } from 'react';
import { Row, Col, Container, Image, Button, Nav } from 'react-bootstrap';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Profile(props) {
    const { user } = useAuthenticator((context) => [context.user]);

    return (
        <Container fluid className='px-5 my-5 generic-container'>
            <Row style={{ 'marginTop': '6rem' }}>
                <Col>
                    Welcome {user?.attributes?.email}
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;