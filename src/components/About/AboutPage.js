import React from "react";
import { Row, Col, Container } from 'react-bootstrap';

import {
  Button,
  Flex,
  Image,
  Text,
  TextField,
  View,
  Alert,
  Divider,
  Message
} from "@aws-amplify/ui-react";

const AboutPage = () => {


  return (

    <Container fluid className='px-3'>
      <Row>
        <Col className='context-col'>
          <Message style={{ backgroundColor: '#ba8686', margin: '2em',  'border-radius': '1em' }}>
            <h2>Conflicts</h2>
            <span>
              A conflict arises when two or more parties hold contrasting opinions or perspectives regarding evident facts, leading to disagreements, clashes, or struggles.
            </span>
          </Message>
          <Divider />


          <Flex direction="row" justifyContent="left" style={{ margin: '2em' }}>
            <div className='f1'>
            <h2>Arguments</h2>
            <span>Arguments are statements put forward to support a particular position or viewpoint during a debate. These arguments are typically based on evidence, reasoning, and logic, and they aim to persuade the audience or opponent of the validity or superiority of one's stance on a given topic. Debate arguments are essential components of structured discourse, serving to advance understanding, challenge opposing viewpoints</span>
            </div>
           <div className='f1'>
            <h2>Facts</h2>
            <span>A fact is a piece of information that is objectively true and can be verified through evidence or observation. It is something that is generally accepted as true and not subject to opinion or interpretation. Facts are fundamental to understanding the world around us and forming informed judgments and decisions.</span>
            </div>    
          </Flex>
          <Divider />

          <Message style={{ backgroundColor: '#cbe2f8', margin: '2em' }}>
            <h2>
              Our goal is to provide a platform to aid conflicting parties in finding resolution by assessing arguments, establishing mutually agreeable facts, and determining the best possible solution. </h2>
            <ol>
              <li>Our users will publish Articles that will have Statment and arguments suportimng it</li>
              <li>Statment that will be Debated by other users as well as AI engine</li>
              <li>Arguments and counter arguments will be added to Debate</li>
              <li>Debate will be weighted by AI engine and possible resolutions will be offered</li>
            </ol>
            <h3>Benefits:</h3>
            <ul>
              <li>Users can adjust argument scoring models and come to more educated own view on the conflict</li>
              <li>Viewing problem from many angles allows for more flexibility and possible conflict resolution</li>
            </ul>
          </Message>
        </Col >
      </Row>
    </Container>
  );
};

export default AboutPage;
