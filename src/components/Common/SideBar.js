import React from 'react';
import '../../App.css'
import { Container, Nav, Row, Col} from 'react-bootstrap';
import { Divider } from '@aws-amplify/ui-react';

const SideBar = props => {
    return (
        <Container className='side-bar px-3 py-3'>
        <Row>
        <Col>
        <Nav>
            <h4>Popular</h4>
            <Nav.Link href='/politics'>Politics</Nav.Link>
            <Nav.Link href='/sports'>Sports</Nav.Link>
            <Nav.Link href='/religion'>Religion</Nav.Link>
            <Nav.Link href='/health'>Health</Nav.Link>
            <Divider />
            <h4>Latest</h4>
            <Divider />
            <Nav.Link href='/sports'>Sports</Nav.Link>
        </Nav>
        </Col>
        </Row>
        </Container>
    );
};

SideBar.propTypes = {
    
};

export default SideBar;