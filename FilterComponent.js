import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const FilterComponent = ({ navigation }) => {
  const [parentType, setParentType] = useState(null);
  const [genderFilter, setGenderFilter] = useState(null);
  const [popularityFilter, setPopularityFilter] = useState(null);
  const [startingLetter, setStartingLetter] = useState(null);

  const handleApplyFilters = () => {
    if (!parentType) {
      Alert.alert("Välj förälder", "Vänligen välj om du är mamma eller pappa.");
      return;
    }
    if (!genderFilter) {
      Alert.alert("Välj kön", "Vänligen välj ett alternativ för kön.");
      return;
    }
    navigation.navigate("SwipeComponent", {
      filter: {
        parentType,
        genderFilter,
        popularityFilter,
        startingLetter,
      },
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Välj dina filter</Text>

          {/* Föräldertyp */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jag är:</Text>
            <View style={styles.buttonGroup}>
              {["mamma", "pappa"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.button, parentType === type && styles.selectedButton]}
                  onPress={() => setParentType(type)}
                >
                  <Text style={[styles.buttonText, parentType === type && styles.selectedButtonText]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Kön */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Välj kön:</Text>
            <View style={styles.buttonGroup}>
              {["boy", "girl", "both"].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[styles.button, genderFilter === gender && styles.selectedButton]}
                  onPress={() => setGenderFilter(gender)}
                >
                  <Text style={[styles.buttonText, genderFilter === gender && styles.selectedButtonText]}>
                    {gender === "boy" ? "Pojknamn" : gender === "girl" ? "Flicknamn" : "Både"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Popularitet */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popularitet:</Text>
            <View style={styles.buttonGroup}>
              {["2021", "2022", "2023"].map((year) => (
                <TouchableOpacity
                  key={year}
                  style={[styles.button, popularityFilter === year && styles.selectedButton]}
                  onPress={() => setPopularityFilter(year)}
                >
                  <Text style={[styles.buttonText, popularityFilter === year && styles.selectedButtonText]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Första bokstaven */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Börjar med:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.letterScroll}>
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <TouchableOpacity
                  key={letter}
                  style={[styles.button, startingLetter === letter && styles.selectedButton]}
                  onPress={() => setStartingLetter(letter)}
                >
                  <Text style={[styles.buttonText, startingLetter === letter && styles.selectedButtonText]}>
                    {letter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Apply Filters Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
            <Text style={styles.applyButtonText}>Visa resultat</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  section: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#6200ea",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  selectedButtonText: {
    color: "#fff",
  },
  applyButton: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "80%",
  },
  applyButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  letterScroll: {
    flexDirection: "row",
    paddingVertical: 10,
  }
});

export default FilterComponent;
