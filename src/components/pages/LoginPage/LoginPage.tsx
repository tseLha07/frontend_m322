import React from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import { useUser } from "../../contexts/UserContext";
import { LoginValues } from "../../../types/LoginValues";
import { Props } from "../../../types/Props";

const LoginPage = ({ navigation, handleLogin }: Props) => {
  const image = require("../../../../assets/Logo.png");
  const { loginUser } = useUser();

  const handleFormSubmit = async (values: LoginValues) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        loginUser(data.user);
        const token = data.accessToken;
        SecureStore.setItemAsync("token", token);
        handleLogin();
        Alert.alert("Login successful");
      } else {
        Alert.alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("An unexpected error occurred during login");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#323232",
        height: "100%",
      }}
    >
      <Image
        source={image}
        style={{ width: 68, height: 85, marginTop: "34%", marginBottom: "8%" }}
      />
      <Text variant="titleLarge" style={{ color: "red", fontWeight: "bold" }}>
        MovieCruxStudio
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TextInput
              style={{
                marginTop: 15,
                backgroundColor: "#323232",
                color: "white",
                width: "90%",
              }}
              label="Email"
              mode="flat"
              underlineColor="white"
              activeUnderlineColor="white"
              textColor="white"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            )}
            <TextInput
              style={{
                marginTop: 15,
                backgroundColor: "#323232",
                color: "white",
                width: "90%",
                fontSize: 17,
              }}
              label="Password"
              mode="flat"
              underlineColor="white"
              activeUnderlineColor="white"
              textColor="white"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {touched.password && errors.password && (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            )}
            <Button
              onPress={() => Alert.alert("Use a Password Manager")}
              textColor="white"
            >
              Forgot your password?
            </Button>
            <Button
              style={{ width: "90%", margin: 10 }}
              mode="contained"
              buttonColor="red"
              onPress={() => handleSubmit()}
            >
              Log In
            </Button>
          </View>
        )}
      </Formik>
      <Button
        onPress={() => navigation?.navigate("Register")}
        textColor="#BDBDBD"
      >
        Register
      </Button>
    </View>
  );
};

export default LoginPage;
