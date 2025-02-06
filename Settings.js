import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { auth, updatePassword } from "./firebaseConfig";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setSuccess("Lösenordet har ändrats!");
        setError("");
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ändra lösenord</Text>
      <TextInput
        style={styles.input}
        placeholder="Nytt lösenord"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Byt lösenord" onPress={handleChangePassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginTop: 12,
  },
  success: {
    color: "green",
    marginTop: 12,
  },
});

export default Settings;
