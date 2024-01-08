import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Navbar from './src/components/navigation/Navbar';
import Router from './src/components/navigation/Router';
import * as SecureStore from 'expo-secure-store';
import { UserProvider } from './src/components/contexts/UserContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error while getting token:', error);
    }
  };

  const handleLogin = () => {
    checkLoggedInStatus();
  };

  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        {isLoggedIn ? (
          <Navbar handleLogin={handleLogin} />
        ) : (
          <Router handleLogin={handleLogin} />
        )}
      </View>
    </UserProvider>
  );
};

export default App;
