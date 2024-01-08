import React, { useEffect, useState } from "react";
import { Button, IconButton } from "react-native-paper";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Props } from "../../../types/Props";
import { Movie } from "../../../types/Movie";
import MoviesService from "../../../services/MoviesService";

interface FormValues {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
  extract: string;
  thumbnail: string;
  href: string;
  thumbnail_width: number;
  thumbnail_height: number;
  id: number;
}

function EditPage({ navigation, route }: Props) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | undefined>();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarErrorVisible, setSnackbarErrorVisible] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      if (movieId) {
        try {
          const movieDetails = await MoviesService.getMovieById(movieId);
          setMovie(movieDetails);
          console.log(movieDetails);
        } catch (error) {
          console.log(error);
        }
      }
    }
    loadMovie();
  }, [movieId]);

  const initialValues: FormValues = {
    title: movie?.title || "",
    year: movie?.year || 0,
    cast: movie?.cast || [],
    genres: movie?.genres || [],
    extract: movie?.extract || "",
    thumbnail: movie?.thumbnail || "",
    href: movie?.href || "",
    thumbnail_width: movie?.thumbnail_width || 0,
    thumbnail_height: movie?.thumbnail_height || 0,
    id: movie?.id || 0,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    year: Yup.number()
      .required("Year is required")
      .min(1800, "Year must be after 1800")
      .max(new Date().getFullYear(), "Year must be before or current year"),
    genres: Yup.array().of(Yup.string()).required("Genres are required"),
    thumbnail: Yup.string().required("Thumbnail URL is required"),
  });

  const updateMovie = async (values: FormValues) => {
    try {
      if (movieId && movie) {
        const updatedMovie = { ...movie, ...values };

        const result = await MoviesService.updateMovieById(
          movieId,
          updatedMovie
        );
        console.log("Movie updated:", result);
        setMovie(updatedMovie);
        setSnackbarVisible(true);
        navigation?.navigate("MoviePage");
      }
    } catch (error) {
      console.error("Error saving movie:", error);
      setSnackbarErrorVisible(true);
    }
  };

  const handleCloseButton = () => {
    Alert.alert(
      "Save Changes",
      "Do you want to save the changes?",
      [
        {
          text: "Cancel",
          onPress: () => {
            navigation?.navigate("DetailsPage", movieId);
          },
        },
        {
          text: "Save",
          onPress: () => {
            if (movieId) {
              MoviesService.updateMovieById(movieId, movie || initialValues)
                .then(() => {
                  navigation?.navigate("DetailsPage");
                  setSnackbarVisible(true);
                })
                .catch((error) => {
                  console.log(error);
                  setSnackbarErrorVisible(true);
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
      <IconButton
        icon={"close"}
        iconColor="white"
        style={styles.closeButtonContainer}
        onPress={() => handleCloseButton}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Update Movie: {movie?.title}</Text>
        {movie && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => updateMovie(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <Text style={{ color: "#707371", fontSize: 12 }}>Title:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>Year:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  value={values.year.toString()} // Convert year to string for TextInput
                  onChangeText={handleChange("year")}
                  onBlur={handleBlur("year")}
                />
                {touched.year && errors.year && (
                  <Text style={styles.errorText}>{errors.year}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>Cast:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cast"
                  value={
                    Array.isArray(values.cast) ? values.cast.join(",") : ""
                  }
                  onChangeText={handleChange("cast")}
                  onBlur={handleBlur("cast")}
                />
                {touched.cast && errors.cast && (
                  <Text style={styles.errorText}>{errors.cast}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>Genre:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Genres"
                  value={values.genres.join(",")}
                  onChangeText={handleChange("genres")}
                  onBlur={handleBlur("genres")}
                />
                {touched.genres && errors.genres && (
                  <Text style={styles.errorText}>{errors.genres}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>Href:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Href"
                  value={values.href}
                  onChangeText={handleChange("href")}
                  onBlur={handleBlur("href")}
                />
                {touched.href && errors.href && (
                  <Text style={styles.errorText}>{errors.href}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>Summary:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Extract"
                  value={values.extract}
                  onChangeText={handleChange("extract")}
                  onBlur={handleBlur("extract")}
                />
                {touched.extract && errors.extract && (
                  <Text style={styles.errorText}>{errors.extract}</Text>
                )}

                <Text style={{ color: "#707371", fontSize: 12 }}>
                  Thumbnail Url:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Thumbnail"
                  value={values.thumbnail}
                  onChangeText={handleChange("thumbnail")}
                  onBlur={handleBlur("thumbnail")}
                />
                {touched.thumbnail && errors.thumbnail && (
                  <Text style={styles.errorText}>{errors.thumbnail}</Text>
                )}

                <Button
                  style={{ width: "90%", margin: 10 }}
                  mode="contained"
                  buttonColor="red"
                  onPress={() => handleSubmit()}
                >
                  Save
                </Button>
              </>
            )}
          </Formik>
        )}
      </View>
    </ScrollView>
  );
}
export default EditPage;

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
  closeButtonContainer: {
    position: "relative",
    top: 20,
    marginLeft: 365,
  },
  input: {
    backgroundColor: "#444",
    color: "white",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  }
});
