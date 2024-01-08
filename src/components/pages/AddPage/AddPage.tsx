import * as React from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import MoviesService from "../../../services/MoviesService";
import { useState } from "react";
import { Props } from '../../../types/Props'
import { Button } from 'react-native-paper'
import { MovieValues } from "../../../types/MovieValues";

function AddPage({ navigation }: Props) {
  const [movie, setMovie] = useState<MovieValues>({
    title: "",
    year: 0,
    cast: [],
    genres: [],
    href: "",
    extract: "",
    thumbnail: "",
  });

  const handleSaveButton = () => {
    Alert.alert(
      "Save Movie",
      "Do you want to save the movie?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            MoviesService.addMovie(movie)
              .then(() => {
                navigation?.navigate("MoviePage");
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Movie</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={movie.title}
        onChangeText={(text) => setMovie({ ...movie, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={movie.year.toString()}
        onChangeText={(text) => setMovie({ ...movie, year: parseInt(text) })}
      />
      <TextInput
        style={styles.input}
        placeholder="Cast (comma-separated)"
        value={movie.cast.join(',')}
        onChangeText={(text) => setMovie({ ...movie, cast: text.split(',') })}
      />
      <TextInput
        style={styles.input}
        placeholder="Genres (comma-separated)"
        value={movie.genres.join(',')}
        onChangeText={(text) => setMovie({ ...movie, genres: text.split(',') })}
      />
      <TextInput
        style={styles.input}
        placeholder="Movie Poster URL"
        value={movie.thumbnail}
        onChangeText={(text) => setMovie({ ...movie, thumbnail: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        value={movie.extract}
        onChangeText={(text) => setMovie({ ...movie, extract: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Movie Source URL"
        value={movie.href}
        onChangeText={(text) => setMovie({ ...movie, href: text })}
      />
      <Button style={{ width: '90%', margin: 10 }}
        mode="contained"
        buttonColor='red' onPress={handleSaveButton}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#323232",
    height: "100%",
    padding: 20,
  },
  title: {
    fontSize: 34,
    color: "red",
    fontWeight: "bold",
    marginBottom: 17,
    marginTop: 17,
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

export default AddPage;