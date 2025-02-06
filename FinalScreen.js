// Updated file: FinalScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FinalScreen = ({ route }) => {
  const { chosenName, parentType } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grattis {parentType}!</Text>
      <Text style={styles.message}>
        Nu har ni äntligen hittat rätt namn. Vi önskar er all lycka i framtiden, och för "{chosenName.name}" önskar vi en lyckosam start i livet!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default FinalScreen;
