import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from '@aws-amplify/ui-react';
import {
  Button,
  Flex,
  Image,
  Text,
  TextField,
  View,
  Alert,
  SwitchField,
  Divider,
  Rating,
  StepperField,
  TextAreaField
} from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { listArguments } from "../../graphql/queries";
import { uploadData, getUrl, remove } from 'aws-amplify/storage';


const TopicPage = () => {
  const [topic, setTopic] = useState([]);
  const [aiArgs, setAiArgs] = useState('');
  const [newArg, setNewArg] = useState('');

  const { owner } = useParams();

  const [alertActive, setAlertActive] = useState(false);
  const client = generateClient()

  const navigate = useNavigate();

  const { authStatus, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.user,
    context.signOut,
  ]);


  //console.log(user?.username);
  async function fetchAi(topic) {
    const ai = await aiArgument(topic, 'list supporting topic');
    setAiArgs(ai);
  }

  function handleTitleChange(event) {
    setNewArg({ value: event.target.value });
  }


  async function fetchArguments() {
    const apiData = await client.graphql(
      { query: listArguments, variables: { filter: { owner: { contains: owner } }, limit: 1 } }
    );
    const topicFromAPI = apiData.data.listArguments.items[0];
    ;
    if (topicFromAPI?.image) {
      const url = await getUrl({ key: topicFromAPI.title });
      topicFromAPI.image = url.url;
    }
    setAlertActive(false);
    setTopic(topicFromAPI);
  }


  async function refreshArgument(topic) {
    topic.map(async (nt) => {
      if (topic.id === nt.id) {
        nt.topic = await aiArgument(topic, 'list supporting topic');
        nt.facts = await aiArgument(topic, 'list facts');
      }
      return nt;
    })
    setTopic(topic);
  }


  async function aiArgument(topic, action = '') {
    //const newtopic = topic.filter((topic) => topic.id !== id);
    try {
      const resp = await fetch("https://9xsl4q3gdk.execute-api.us-east-2.amazonaws.com/Prod/getAssist", {
        method: "POST",
        body: JSON.stringify({
          data: action + ':' + topic
        }
        ),
        headers: {
          "Content-type": "application/json;"
        }
      });
      const body = await resp.body;
      debugger;
      const reader = body.getReader();
      //console.dir(reader);
      const txt = await reader.read();
      return JSON.parse(new TextDecoder().decode(txt.value)).body.data[1].content[0].text.value
    } catch {
      setAlertActive(true);
    }
  }

  useEffect(() => {
    fetchArguments();
  }, []);

  /*   useEffect(() => {
      fetchAi();
    }, [topic.length]); */

  return (

    <Container fluid className='px-3'>
      {alertActive && (
        <Alert
          colorTheme="warning"
          isDismissible={true}
          onDismiss={() => setAlertActive(false)}
        >
          You don't have permission
        </Alert>)
      }
      {topic?.title &&
        <Row>
          <Col className='topic context-col'>
            <View className="articles">
              <View>
                <div key={`topic-${topic.title}`}>
                  <h2 fontWeight={400}>
                    {topic.title}
                  </h2>

                  <Flex
                    className="articles-list"
                    key={topic.id || topic.name}
                    direction="row"
                    justifyContent="left"
                  >
                    <div className="f1" >
                      <h3>
                        {topic.description}
                        {topic.image && (
                          <Image
                            className="wrapImage"
                            src={topic.image}
                            alt={`visual aid for ${topic.name}`}
                          />
                        )}
                      </h3>

                      <Text>{topic.topics}</Text>
                      <Divider />
                      <Text>{topic.aitopics ? topic.aitopics : ''}</Text>
                      <Rating maxValue='10' value={topic.strength} />
                      <br />
                      <span>Writen by: {topic.owner}</span>

                    </div>

                   
                  </Flex>
                  <h2 fontWeight={400}>
                    Chat with me
                  </h2>
                  <TextAreaField
                    className="chat-text"
                    id="chat"
                    rows={10}
                    disabled
                    resize="vertical"
                    maxLength={1000}


                  />

                  <TextField
                    descriptiveText="Type your question for AI Bot"
                    onKeyUp={async (evt) => {
                      const text = evt.target.value;
                      if (evt?.key === "Enter") {
                        evt.target.value = 'Waiting for response from AI bot .....';
                        document.getElementById("chat").value = document.getElementById("chat").value  + 'Client:' + text  + '\n';
                        const ai = await aiArgument(text, "Answer");
                        evt.target.value = '';
                        document.getElementById("chat").value = document.getElementById("chat").value  + "AI Bot says:" + ai + '\n';
                      }
                    }} />
                </div>
              </View>
            </View>
          </Col>
        </Row>
      }
    </Container>
  );
};

export default TopicPage;
