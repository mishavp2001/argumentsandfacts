import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css'
import { Container, Image, Col, Row } from 'react-bootstrap';

const FooterBar = props => {
    return (
        <footer className="app-footer">
            <Container fluid>        
                    <span className='text-end'>
                        &copy; 2023
                        <Image width='30px' src='/img/logo.png' fluid />
                    </span>
            </Container>    
        </footer>
    );
};

FooterBar.propTypes = {
    
};

export default FooterBar;