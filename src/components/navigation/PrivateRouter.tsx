import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailPage from "../pages/DetailsPage/MovieDetailPage";
import MoviesPage from "../pages/MoviePage/MoviePage";
import EditPage from "../pages/EditPage/EditPage";
import AddPage from "../pages/AddPage/AddPage";


const Stack = createNativeStackNavigator();

export const MovieStack = () => {
  return (
    <Stack.Navigator initialRouteName="MoviePage" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="DetailsPage" component={MovieDetailPage}></Stack.Screen>
      <Stack.Screen name="MoviePage" initialParams={{ movieId: undefined }} component={MoviesPage}></Stack.Screen>
      <Stack.Screen name="EditPage" component={EditPage}></Stack.Screen>
      <Stack.Screen name="AddPage" component={AddPage}></Stack.Screen>
    </Stack.Navigator>
  )
}

const PrivatRouter = () => {
  return (
    <NavigationContainer>
      <MovieStack />
    </NavigationContainer>
  );
};

export default PrivatRouter;
