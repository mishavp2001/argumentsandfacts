import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Image,
  Text,
  TextField,
  View,
  Alert
} from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';

import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";

const ArticlesPage = () => {
  const [notes, setNotes] = useState([]);
  const [alertActive, setAlertActive] = useState(false);

  const navigate = useNavigate();

  const { route, user, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  //console.log(user?.username);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setAlertActive(false);
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image?.name,
      user: user?.username
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
      authMode: user?.username ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    try {
      await API.graphql({
        query: deleteNoteMutation,
        variables: { input: { id } },
        authMode: user?.username ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM'
      });
      await Storage.remove(name);
      setNotes(newNotes);
    } catch {
      setAlertActive(true);
    }
  }

  async function debateNote(note) {
    //const newNotes = notes.filter((note) => note.id !== id);
    try {
      const resp = await fetch("https://9xsl4q3gdk.execute-api.us-east-2.amazonaws.com/Prod/getPrompt", {
        method: "POST",
        body: JSON.stringify({
          data: 'Debate:' +  note.name }
        ),
        headers: {
          "Content-type": "application/json;"
        }
      });
      const body = await response.body;
      const reader = body.getReader();
      console.dir(reader);
      alert(reader.json());
    } catch {
      setAlertActive(true);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

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
              {notes.map((note) => (
                <Flex
                  className="articles-list"
                  key={note.id || note.name}
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Text as="strong" className="f1" fontWeight={700}>
                    {note.name}
                  </Text>
                  <Text className="f2" as="span">{note.description}</Text>
                  {note.image && (
                    <Image
                      className="fs"
                      src={note.image}
                      alt={`visual aid for ${notes.name}`}
                    />
                  )}

                  {route === 'authenticated' && (
                    <div>
                      <Button variation="link" onClick={() => deleteNote(note)}>
                        Delete
                      </Button>
                      <Button variation="link" onClick={() => debateNote(note)}>
                        Debate
                      </Button>
                    </div>
                  )}
                </Flex>
              ))}
            </View>

            {user?.username &&
              <div className="article-publish">
                <View as="form" margin="3rem 0" onSubmit={createNote}>
                  <Flex direction="column" justifyContent="left">
                    <span>Publish your article</span>
                    <TextField
                      name="name"
                      placeholder="Statment"
                      label="Statment"
                      labelHidden
                      variation="quiet"
                      required />
                    <TextField
                      name="description"
                      placeholder="Argemnet & Facts"
                      label="Argemnet"
                      labelHidden
                      variation="quiet"
                      required />
                    <View
                      name="image"
                      as="input"
                      type="file"
                      placeholder="Add Image"
                      style={{}} />
                    <Button type="submit" variation="primary">
                      Publish
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

export default ArticlesPage;
