import React, { useEffect } from 'react';
import '../../App.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Form, FormControl, Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const NavigationBar = props => {

    const { route, user, authStatus, signOut } = useAuthenticator((context) => [
        context.route,
        context.user,
        context.authStatus,
        context.signOut
    ]);
  
    const navigate = useNavigate();
    const path = useResolvedPath();

    function handleLogOut() {
        signOut();
        //navigate('/login');
    }

console.dir( path.pathname, route);

    return (
        <header>
            <Navbar variant="dark" expand="lg" bg='info' fixed='top'>
                <Navbar.Brand className={`brand ${path.pathname === "/" ? "selected" : ""}`} href="/">
                    {!props.showNav ? user?.username : 'Arguments&Facts' }
                </Navbar.Brand>
              
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {props.showNav &&
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/arguments' className={path.pathname === "/arguments" ? "selected" : ""}>Arguments</Nav.Link>
                        <Nav.Link href='/debates' className={path.pathname === "/debates" ? "selected" : ""}>Debates</Nav.Link>
                        <Nav.Link href='/about' className={path.pathname === "/about" ? "selected" : ""}>About</Nav.Link>
                    </Nav>

                    <Form className='d-flex'>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="secondary">Search</Button>
                    </Form>
                    <Nav className='ms-md-auto login-nav'>
                        {authStatus === 'authenticated' ?
                            <NavDropdown title={user?.username} id="email">
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
                            </NavDropdown> :
                            <Nav.Link href='/login'>Login</Nav.Link>
                        }
                    </Nav>

                </Navbar.Collapse>}
            </Navbar>
        </header>

    );
};

NavigationBar.propTypes = {

};

export default NavigationBar;