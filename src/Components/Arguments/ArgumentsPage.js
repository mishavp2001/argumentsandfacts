import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
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
  StepperField
} from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { createArgument as createArgumentMutation, deleteArgument as deleteArgumentMutation } from '../../graphql/mutations';
import { listArguments, getArguments } from "../../graphql/queries";
import { uploadData, getUrl, remove } from 'aws-amplify/storage';

import { fetchAuthSession } from 'aws-amplify/auth'


const ArgumentsPage = () => {
  const [args, setArguments] = useState([]);
  const [aiArgs, setAiArgs] = useState('');
  const [newArg, setNewArg] = useState('');

  const [alertActive, setAlertActive] = useState(false);
  const client = generateClient()

  const navigate = useNavigate();

  const { authStatus, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.user,
    context.signOut,
  ]);


  //console.log(user?.username);
  async function fetchAi(argument) {
    const ai = await aiArgument(argument, 'list supporting args');
    setAiArgs(ai);
  }

  function handleTitleChange(event) {
    setNewArg({ value: event.target.value });
  }


  async function fetchArguments() {
    const apiData = await client.graphql({ query: listArguments });
    const argsFromAPI = apiData.data.listArguments.items;
    await Promise.all(
      argsFromAPI.map(async (argument, index) => {
        if (argument.image) {
          const url = await getUrl({ key: argument.title });
          argument.image = url.url;
        }
        return argument;
      })
    );
    setAlertActive(false);
    setArguments(argsFromAPI);
  }

  async function createArgument(event) {
    event.preventDefault();
    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      description: form.get("description"),
      title: form.get("title"),
      public: form.get("public"),
      aiarguments: [form.get("aiarguments")],
      arguments: [form.get("arguments")],
      image: image?.name,
    };
    if (!!data.image) await uploadData(data.title, image);
    await client.graphql({
      query: createArgumentMutation,
      variables: { input: data },
      authMode: "AMAZON_COGNITO_USER_POOLS",
      authToken:  authToken
    });
    fetchArguments();
    event.target.reset();
  }

  async function deleteArgument({ id, title, image }) {
    const newargs = args.filter((argument) => argument.id !== id);
    const authToken = (await fetchAuthSession()).tokens?.idToken?.toString();
    try {
      await client.graphql({
        query: deleteArgumentMutation,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
        authToken:  authToken
      });
      if (image) await await remove(title);
      setArguments(newargs);
    } catch {
      setAlertActive(true);
    }
  }

  async function refreshArgument(argument) {
    args.map(async (nt) => {
      if (argument.id === nt.id) {
        nt.args = await aiArgument(argument, 'list supporting args');
        nt.facts = await aiArgument(argument, 'list facts');
      }
      return nt;
    })
    setArguments(args);
  }

  async function aiArgument(argument, action = '') {
    //const newargs = args.filter((argument) => argument.id !== id);
    try {
      const resp = await fetch("https://9xsl4q3gdk.execute-api.us-east-2.amazonaws.com/Prod/getPrompt", {
        method: "POST",
        body: JSON.stringify({
          data: action + ':' + argument
        }
        ),
        headers: {
          "Content-type": "application/json;"
        }
      });
      const body = await resp.body;
      const reader = body.getReader();
      //console.dir(reader);
      const txt = await reader.read();
      return new TextDecoder().decode(txt.value);
    } catch {
      setAlertActive(true);
    }
  }

  useEffect(() => {
    fetchArguments();
  }, []);

  /*   useEffect(() => {
      fetchAi();
    }, [args.length]); */

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
      <Row>
        <Col className='context-col'>
          <View className="articles">
            <View>
              {args.map((argument, index) => {
                return (
                  <div key={`args-${argument.title}`}>
                    <Accordion.Container className="accordion-articles" defaultValue={['item-0']}>
                      <Accordion.Item value={`item-${index}`}>
                        <Accordion.Trigger>
                          <Text as="strong" fontWeight={400}>
                            {argument.title}
                          </Text>
                          <Accordion.Icon />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          <Flex
                            className="articles-list"
                            key={argument.id || argument.name}
                            direction="row"
                            justifyContent="left"
                          >
                            <div className="f1" >
                              <h3>
                                {argument.description}
                                {argument.image && (
                              <Image
                                className="wrapImage"  
                                src={argument.image}
                                alt={`visual aid for ${args.name}`}
                              />
                            )}
                              </h3>

                              <Text>{argument.arguments}</Text>
                              <Divider />
                              <Text>{argument.aiarguments ? argument.aiarguments : ''}</Text>
                              <Rating maxValue='10' value={argument.strength}/>
                              <br />
                              <span>Writen by: {argument.owner}</span>

                            </div>
                           

                            {authStatus === 'authenticated' && (
                              <div style={{ 'display': 'table-column', textAlign: 'left' }}>
                                <div>
                                  <Button title="Update article" variation="link" onClick={() => deleteArgument(argument)}>
                                    Edit
                                  </Button>
                                </div>
                                <div>
                                  <Button title="Delete article" variation="link" onClick={() => deleteArgument(argument)}>
                                    Delete
                                  </Button>
                                </div>

                              </div>
                            )}
                          </Flex>
                        </Accordion.Content>
                      </Accordion.Item>
                    </Accordion.Container>
                  </div>
                )
              })}
            </View>

            {user?.username &&
              <div className="article-publish">
                <View as="form" margin="3rem 0" onSubmit={createArgument}>
                  <Flex direction="column" justifyContent="left">
                    <h1>Add argument</h1>
                    <TextField
                      name="title"
                      placeholder="Argument - compose a concise sentence articulating a belief you hold strongly."
                      label="Arguments"
                      labelHidden
                      variation="quiet"
                      onChange={handleTitleChange}
                      required />
                    <TextField
                      name="description"
                      placeholder="Add more detailed overview on why do you think you have valid argument"
                      label="Description"
                      labelHidden
                      variation="quiet"
                      required />
                    <TextField
                      name="arguments"
                      placeholder="Add your own or existing supporting arguments"
                      label="Arguments"
                      labelHidden
                      variation="quiet"
                      required />
                    <StepperField
                      label="Rate argument strength"
                      name="strength"
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={1}
                    />
                    
                    <Flex
                      className="args-list"
                      direction="row"
                      justifyContent="left"
                      alignItems="center"
                    >
                    <TextField label="ai arguments" className="f2" as="strong" name='aiarguments'>
                      {aiArgs}
                    </TextField>
                      <Button onClick={() => fetchAi(newArg.value)} variation="primary">
                        Fetch AI arguments, when ready
                      </Button>
                    </Flex>
                    <SwitchField
                      name="public"
                      isDisabled={false}
                      label="Public"
                      labelPosition="start"
                    />
                    <View
                      name="image"
                      as="input"
                      type="file"
                      placeholder="Add Image"
                      style={{}} />
                    <Button type="submit" variation="primary">
                      Save
                    </Button>

                  </Flex>
                </View>
              </div>}
          </View>
        </Col>
      </Row>
    </Container>
  );
};

export default ArgumentsPage;
