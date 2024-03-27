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
} from "@aws-amplify/ui-react";
import { useAuthenticator } from '@aws-amplify/ui-react';

import { listNotes } from "../../graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "../../graphql/mutations";

const ArticlesPage = () => {
  const [notes, setNotes] = useState([]);
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
    setNotes(newNotes);
    await Storage.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id }},
      authMode: user?.username ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM'
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (

    <Container fluid className='px-3'>
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
                    <Text as="strong" fontWeight={700}>
                      {note.name}
                    </Text>
                    <Text as="span">{note.description}</Text>
                    {note.image && (
                      <Image
                        src={note.image}
                        alt={`visual aid for ${notes.name}`}
                        style={{ width: 400 }}
                      />
                    )}

                    {route === 'authenticated' && (
                      <Button variation="link" onClick={() => deleteNote(note)}>
                      Delete
                    </Button>
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
