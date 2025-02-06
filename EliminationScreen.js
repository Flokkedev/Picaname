import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const EliminationScreen = ({ route, navigation }) => {
  const { matchedNames, parentType } = route.params;
  const [index, setIndex] = useState(0);

  const handleFinalChoice = () => {
    const chosenName = matchedNames[index];
    navigation.navigate("FinalScreen", { chosenName, parentType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj det slutliga namnet</Text>
      <Text style={styles.name}>{matchedNames[index].name}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Ogilla" onPress={() => setIndex((index + 1) % matchedNames.length)} />
        <Button title="Välj" onPress={handleFinalChoice} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default EliminationScreen;
