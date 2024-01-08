import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import MoviesService from "../../../services/MoviesService";
import { IconButton, Text, TextInput, Button } from "react-native-paper";
import { Movie } from "../../../types/Movie";
import RNPickerSelect from 'react-native-picker-select';
import { Props } from '../../../types/Props'

const MoviesPage: React.FC<Props> = ({ navigation }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const Movies = async () => {
      try {
        const moviesData = await MoviesService.getMovie();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error("Fetching movies failed", error);
      }
    };
    Movies();
  }, []);

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation?.navigate('DetailsPage', { movieId: item.id })}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      </View>
    </TouchableWithoutFeedback>
  );

  const handleFilter = () => {
    const filtered = movies.filter(movie => {
      const titleMatch = movie.title?.toLowerCase().includes(searchTitle.toLowerCase());
      const genreMatch = selectedGenre === 'All' || movie.genres?.includes(selectedGenre);
      return titleMatch && genreMatch;
    });
    setFilteredMovies(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Movies</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode='flat'
          underlineColor='white'
          activeUnderlineColor='white'
          textColor='white'
          placeholder="Filmtitle"
          value={searchTitle}
          onChangeText={(text) => setSearchTitle(text)}
        />
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            style={{
              placeholder: {
                color: 'red'
              },
              inputIOS: {
                color: 'red'
              },
              inputAndroid: {
                color: 'red'
              }
            }}
            placeholder={{
              label: 'Genre (All)',
              value: 'All',
            }}
            onValueChange={(value) => setSelectedGenre(value)}
            items={[
              { label: 'Action', value: 'Action' },
              { label: 'Adventure', value: 'Adventure' },
              { label: 'Comedy', value: 'Comedy' },
              { label: 'Crime', value: 'Crime' },
              { label: 'Drama', value: 'Drama' },
              { label: 'Fantasy', value: 'Fantasy' },
              { label: 'Horror', value: 'Horror' },
              { label: 'Thriller', value: 'Thriller' },
              { label: 'Science Fiction', value: 'Science Fiction' },
              { label: 'Supernatural', value: 'Supernatural' },
              { label: 'Thriller', value: 'Thriller' },
            ]}
          />
        </View>
        <Button
          style={styles.button}
          mode="contained"
          buttonColor='red'
          onPress={handleFilter}
        >
          Search
        </Button>
      </View>

      <FlatList
        numColumns={2}
        data={filteredMovies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
      />
      <IconButton
        icon={"plus-circle"}
        iconColor="red"
        size={68}
        style={styles.addButtonContainer}
        onPress={() => navigation?.navigate("AddPage")}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#323232",
  },
  card: {
    margin: 15,
    overflow: "hidden",
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    backgroundColor: '#323232',
    color: 'white',
    width: '33%',
  },
  button: {
    width: '33%',
  },
  thumbnail: {
    width: 140,
    height: 190,
  },
  header: {
    height: 100,
    backgroundColor: "#474545",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    flexDirection: "row",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginTop: 35,
  },
  logo: {
    width: 24,
    height: 28,
    marginTop: 35,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 8,
    right: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flex: 1,
  },
});

export default MoviesPage;
