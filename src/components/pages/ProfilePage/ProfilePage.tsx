import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../../contexts/UserContext';
import { Props } from '../../../types/Props'

const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#323232",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "red",
        fontWeight: "bold",
        marginBottom: 10,
    },
    text: {
        padding: '3%',
        color: "white"
    }
});

function ProfilePage({ handleLogin }: Props) {
    const { user } = useUser();

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            handleLogin();
            Alert.alert('Logout successful');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('An unexpected error occurred during logout');
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Account Details
            </Text>

            {user?.firstname && <Text variant="labelLarge" style={styles.text}>First Name: {user.firstname}</Text>}
            {user?.lastname && <Text variant="labelLarge" style={styles.text}>Last Name: {user.lastname}</Text>}

            <Text variant="labelLarge" style={styles.text}>
                {user ? `Email: ${user.email}` : 'No user data available'}
            </Text>
            <Button mode="contained" buttonColor="red" onPress={logout}>
                Logout
            </Button>
        </View>
    );
}

export default ProfilePage;