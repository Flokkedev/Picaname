import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth();

const Authentication = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setMessage("");
  };

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully!");
        setError("");
        setTimeout(() => navigation.navigate("FilterComponent"), 1500); // Navigate after sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Signed in successfully!");
        setError("");
        navigation.navigate("Profile"); // Navigate after login
      }
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignUp ? "Create Account" : "Log In"} onPress={handleAuth} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}
      {!isSignUp && (
        <TouchableOpacity onPress={handlePasswordReset}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={toggleAuthMode}>
        <Text style={styles.link}>
          {isSignUp ? "Already have an account? Log in" : "Don’t have an account? Sign up"}
        </Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
    textAlign: "center",
  },
  success: {
    color: "green",
    marginTop: 12,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default Authentication;
