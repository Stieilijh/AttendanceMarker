import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./app/screens/HomeScreen";
import BarcodeScreen from "./app/screens/BarcodeScreen";
import ConfigDBScreen from "./app/screens/ConfigDBScreen";
import EventInfoScreen from "./app/screens/EventInfoScreen";
import ShareFileScreen from "./app/screens/ShareFileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: " MES Rotaract " }}
        />
        <Stack.Screen
          name="ConfigDBScreen"
          component={ConfigDBScreen}
          options={{ title: " Step-1 " }}
        />
        <Stack.Screen
          name="EventInfoScreen"
          component={EventInfoScreen}
          options={{ title: "Step-2" }}
        />
        <Stack.Screen
          name="BarcodeScreen"
          component={BarcodeScreen}
          options={{ title: " Step-3 " }}
        />
        <Stack.Screen
          name="ShareFileScreen"
          component={ShareFileScreen}
          options={{ title: " Share " }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
