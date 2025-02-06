import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseConfig"; // Firebase authentication

// Import Screens
import Authentication from "./Authentication"; // Replaced SignIn & SignUp
import Profile from "./Profile";
import Settings from "./Settings";
import EliminationScreen from "./EliminationScreen";
import FinalScreen from "./FinalScreen";
import SwipeComponent from "./SwipeComponent";
import FilterComponent from "./FilterComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    // Log initial state
    console.log("App mounted. Initial state:");
    console.log("isLoggedIn:", isLoggedIn);
    console.log("isFirstLogin:", isFirstLogin);

    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("onAuthStateChanged triggered. User:", user);

      if (user) {
        setIsLoggedIn(true);
        console.log("User is logged in:", user.email);

        const firstLogin = await AsyncStorage.getItem("isFirstLogin");
        console.log("Retrieved isFirstLogin from AsyncStorage:", firstLogin);

        if (!firstLogin) {
          console.log("This is the user's first login. Setting flag in AsyncStorage.");
          setIsFirstLogin(true);
          await AsyncStorage.setItem("isFirstLogin", "false");
        } else {
          setIsFirstLogin(false);
          console.log("User is not logging in for the first time.");
        }
      } else {
        console.log("User is not logged in.");
        setIsLoggedIn(false);
      }
    });

    // Cleanup function
    return () => {
      console.log("Cleaning up auth listener.");
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* If user is not logged in */}
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Authentication" component={Authentication} />
          </>
        ) : (
          // If user is logged in
          <>
            {isFirstLogin ? (
              <Stack.Screen name="FilterComponent" component={FilterComponent} />
            ) : (
              <>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="EliminationScreen" component={EliminationScreen} />
                <Stack.Screen name="FinalScreen" component={FinalScreen} />
                <Stack.Screen name="SwipeComponent" component={SwipeComponent} />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
