import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./components/home";
import CartScreen from "./components/cart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stacknavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default Stacknavigator;
