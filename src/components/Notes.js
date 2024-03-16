import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Auth } from "aws-amplify";
import {
    Button,
    Flex,
    Image,
    Text,
    TextField,
    View,
  } from "@aws-amplify/ui-react";
  import { listNotes } from "../graphql/queries";
  import {
    createNote as createNoteMutation,
    deleteNote as deleteNoteMutation,
  } from "../graphql/mutations";
  import { API } from "aws-amplify";

const Notes = () => {
  const [notes, setNotes] = useState([]);
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
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
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
      variables: { input: { id } },
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <h1>Articles</h1>
      <View className="App">
  <View margin="3rem 0" style={{}}>
    {notes.map((note) => (
      <Flex
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
        <Button variation="link" onClick={() => deleteNote(note)}>
          Delete Statment
        </Button>
      </Flex>
    ))}
  </View>

        <div style={{}}>
          <View as="form" margin="3rem 0" onSubmit={createNote}>
            <Flex direction="column" justifyContent="left">
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
                Publish Statment
              </Button>
            </Flex>
          </View>
        </div>
</View>
    </>
  );
};

export default Notes;
