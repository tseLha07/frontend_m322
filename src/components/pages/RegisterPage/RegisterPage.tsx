import React from "react";
import { View, Image, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { Props } from "../../../types/Props";

type RegisterValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const RegisterPage = ({ navigation }: Props) => {
  const image = require("../../../../assets/Logo.png");

  const handleFormSubmit = async (values: RegisterValues) => {
    try {
      const response = await fetch("http://noseryoung.ddns.net:3030/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigation?.navigate("Login");
        Alert.alert("Sign Up successful");
      } else {
        Alert.alert("Sign Up failed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      Alert.alert("An unexpected error occurred during sign up");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    firstname: Yup.string().notRequired(),
    lastname: Yup.string().notRequired(),
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
        TVDB
      </Text>
      <Formik
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
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
              label="First Name"
              mode="flat"
              underlineColor="white"
              activeUnderlineColor="white"
              textColor="white"
              value={values.firstname}
              onChangeText={handleChange("firstname")}
              onBlur={handleBlur("firstname")}
            />

            <TextInput
              style={{
                marginTop: 15,
                backgroundColor: "#323232",
                color: "white",
                width: "90%",
              }}
              label="Last Name"
              mode="flat"
              underlineColor="white"
              activeUnderlineColor="white"
              textColor="white"
              value={values.lastname}
              onChangeText={handleChange("lastname")}
              onBlur={handleBlur("lastname")}
            />

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
              style={{ width: "90%", margin: 10 }}
              mode="contained"
              buttonColor="red"
              onPress={() => handleSubmit()}
            >
              Sign Up
            </Button>
          </View>
        )}
      </Formik>
      <Button onPress={() => navigation?.navigate("Login")} textColor="#BDBDBD">
        Login
      </Button>
    </View>
  );
};

export default RegisterPage;
