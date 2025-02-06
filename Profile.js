import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "./firebaseConfig";

const Profile = ({ navigation }) => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace("Authentication"); // Updated to new auth system
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Välkommen, {user?.displayName || user?.email}
      </Text>
      <Button
        title="Ändra inställningar"
        onPress={() => navigation.navigate("Settings")}
      />
      <Button
        title="Swipa namn"
        onPress={() => navigation.navigate("SwipeComponent")}
      />
      <Button title="Logga ut" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Profile;
