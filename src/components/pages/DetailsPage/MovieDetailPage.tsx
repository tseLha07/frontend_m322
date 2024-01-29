import { View, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { Movie } from "../../../types/Movie";
import MoviesService from "../../../services/MoviesService";
import { Props } from "../../../types/Props";
import { FavoriteContext } from "../../contexts/FavoriteContext";

function MovieDetailPage({ navigation, route }: Props) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie>();
  const { addToFavorites, removeFromFavorites } = useContext(FavoriteContext);

  const [buttonPressed, setButtonPressed] = useState(false);

  const renderFavoritesList = (movie: Movie) => {
    if (buttonPressed) {
      removeFromFavorites(movie);
      setButtonPressed(false);
    } else {
      addToFavorites(movie);
      setButtonPressed(true);
    }
  };

  useEffect(() => {
    function load() {
      if (movieId) {
        MoviesService.getMovieById(movieId)
          .then((movie) => {
            setMovie(movie);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    load();
  }, [movieId]);

  const handleDeleteMovie = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this movie?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Delete",
          onPress: () => {
            if (movieId) {
              MoviesService.deleteMovie(movieId)
                .then(() => {
                  navigation?.navigate("MoviePage");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <IconButton
          icon={"close"}
          iconColor="white"
          style={styles.closeButtonContainer}
          onPress={() => navigation?.navigate("MoviePage")}
        />
        <Card style={styles.cardContainer}>
          {movie && (
            <>
              <Image source={{ uri: movie.imageURL }} style={styles.image} />
              <Text style={styles.cardTitle}>{movie.name}</Text>

              <IconButton
                icon={"pencil"}
                iconColor="red"
                style={styles.editButtonContainer}
                onPress={() =>
                  navigation?.navigate("EditPage", { movieId: movie.id })
                }
              />
              <IconButton
                icon={"heart"}
                iconColor={buttonPressed ? "red" : "white"}
                style={styles.editButtonContainer}
                onPress={() => renderFavoritesList(movie)}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.cardText}>Year: {movie.releaseDate}</Text>
                <Text style={styles.cardText}>
                  Genres: {movie.genre.join(", ")}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.cardText}>Cast: </Text>
                <Text style={styles.cardText}>{movie.cast.join(", ")}</Text>
              </View>
              <Text style={styles.cardText}>Summary: </Text>
              <Text style={styles.cardText}>{movie.summary} </Text>
              <IconButton
                icon={"delete"}
                iconColor="red"
                style={styles.deleteButtonContainer}
                onPress={handleDeleteMovie}
              />
            </>
          )}
        </Card>
      </View>
    </ScrollView>
  );
}

export default MovieDetailPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#323232",
    height: "100%",
  },
  closeButtonContainer: {
    position: "relative",
    top: 20,
    marginLeft: 365,
  },
  editButtonContainer: {
    position: "relative",
  },
  deleteButtonContainer: {
    position: "relative",
    marginLeft: 280,
  },
  cardContainer: {
    backgroundColor: "#3c3e3c",
    alignSelf: "center",
    width: 350,
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
  },
  cardText: {
    fontSize: 14,
    color: "white",
  },
  detailsContainer: {
    paddingBottom: 10,
  },
  image: {
    width: 145,
    height: 195,
    borderRadius: 8,
  },
});
