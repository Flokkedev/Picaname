import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import Confetti from "react-canvas-confetti"; // Updated confetti library
import { db } from "./firebaseConfig";
import { boyNames, girlNames } from "./names";

const SwipeComponent = ({ route }) => {
  const { filter } = route.params;
  const [names, setNames] = useState(
    filter === "boy"
      ? [...boyNames]
      : filter === "girl"
      ? [...girlNames]
      : [...boyNames, ...girlNames]
  );
  const [index, setIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const confettiRef = useRef(null);

  const handleSwipeRight = async () => {
    try {
      await db.collection("matches").add({ name: names[index].name, gender: names[index].gender });
      setMatched(true);

      if (confettiRef.current) {
        confettiRef.current({ particleCount: 200, spread: 70, origin: { x: 0.5, y: 0.5 } });
      }

      goToNextName();
    } catch (error) {
      console.error("Fel vid sparning av namn:", error);
    }
  };

  const handleSwipeLeft = () => {
    goToNextName();
  };

  const goToNextName = () => {
    setNames((prevNames) => {
      const currentName = prevNames[index];
      const updatedNames = [...prevNames.slice(0, index), ...prevNames.slice(index + 1), currentName];
      return updatedNames;
    });
    setIndex((prevIndex) => (prevIndex + 1) % names.length);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground source={require("./assets/background.jpg")} style={styles.background}>
        <Swipeable
          renderLeftActions={() => <Text style={styles.actionText}>Ogilla</Text>}
          renderRightActions={() => <Text style={styles.actionText}>Gilla</Text>}
          onSwipeableRightOpen={handleSwipeRight}
          onSwipeableLeftOpen={handleSwipeLeft}
        >
          <Animated.View entering={SlideInRight.duration(300)} exiting={SlideOutLeft.duration(300)} style={styles.card}>
            <Text style={styles.name}>{names[index].name}</Text>
          </Animated.View>
        </Swipeable>

        {matched && (
          <View style={styles.matchAnimation}>
            <Text style={styles.matchText}>MATCH!</Text>
            <Confetti ref={confettiRef} />
          </View>
        )}
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actionText: {
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#000",
    padding: 10,
  },
  matchAnimation: {
    marginTop: 20,
    backgroundColor: "pink",
    padding: 20,
    borderRadius: 10,
  },
  matchText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SwipeComponent;
