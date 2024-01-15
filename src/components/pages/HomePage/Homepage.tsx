import { Text } from "react-native-paper";
import React from "react";
import { View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#323232",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 150,
    marginBottom: 20,
  },
});
function HomePage() {
  return (
    <View style={styles.container}>
      <Image source={require("../../../../assets/Logo.png")} style={styles.logo} />
      <Text
        variant="titleLarge"
        style={{ color: "red", fontWeight: "bold", marginBottom: 10 }}
      >
        TVDB
      </Text>
      <Text variant="labelLarge" style={{ color: "white" }}>
        Where Every Detail Sparks Cinematic Magic!
      </Text>
    </View>
  );
}

export default HomePage;
