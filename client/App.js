import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AppProvider } from './src/context/AppContext';
import MainContainer from './navigation/MainContainer';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <MainContainer />
      </NavigationContainer>
    </AppProvider>
  );
}
