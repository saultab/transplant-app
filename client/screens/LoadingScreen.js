import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const LoadingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SuggestMe');
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: '#669BBC' }]}>
        <Text style={styles.modalText2}>
          {"Wait a few moments...\n\nThe AI is looking for friends that are most suitable for you."}
        </Text>
        <ActivityIndicator size={65} color="#fff" />
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#669BBC',
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  }
});

export default LoadingScreen;
