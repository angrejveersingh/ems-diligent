import { StatusBar, TouchableOpacity } from "react-native";

import React, { useState } from "react";
import { Button, Alert, Platform } from "react-native";

import Signup from "./screens/SignUp/Signup";
import { store } from "./components/redux/store";
import { Provider } from "react-redux";
import Login from "./screens/Login/Login";
import { useNavigation } from "@react-navigation/native";
import Dashboard from "./screens/Dashboard/Dashboard";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import AppStyles from "./AppStyles";


const Stack = createStackNavigator();

const MyStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ 
          headerShown: false,
          title: "Signup", 
          gestureEnabled: false 
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={
          { headerShown: false, 
            title: "Login", 
            gestureEnabled: false 
          }
        }
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={
          {
            title: "HomeScreen",
            gestureEnabled: false,
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity style={AppStyles.button} onPress={() => {
                if (Platform.OS === "web") {
                  navigation.navigate("Login");
                } else {
                  Alert.alert("Caution!", "Do you want to log out?", [
                    {
                      text: "Log Out",
                      onPress: () => {
                        navigation.navigate("Login");
                      },
                    },
                    { text: "Cancel" },
                  ]);
                }
              }}>
                <Text style={AppStyles.buttonText}>Log out</Text>
                <Ionicons name="log-out-outline" size={18} color="#fff" />
              </TouchableOpacity>
            ),
          }
        }
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={
          {
            title: "Dashboard",
            gestureEnabled: false,
            headerLeft: null,
            headerRight: () => (
              <TouchableOpacity style={AppStyles.button} onPress={() => {
                  if (Platform.OS === "web") {
                    navigation.navigate("HomeScreen");
                  } else {
                    Alert.alert("Caution!", "Do you want to Clock out?", [
                      {
                        text: "Clock Out",
                        onPress: () => {
                          navigation.navigate("HomeScreen");
                        },
                      },
                      { text: "Cancel" },
                    ]);
                  }
                }}>
                <Text style={AppStyles.buttonText}>Clock out</Text>
                <Ionicons name="alarm-outline" size={18} color="#fff" />
              </TouchableOpacity>
            ),
          }
        }
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <MyStack></MyStack>
      </NavigationContainer>
    </Provider>
  );
}