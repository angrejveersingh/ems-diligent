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
import Settings from "./screens/Settings/Settings";
import { Entypo,EvilIcons } from '@expo/vector-icons';

import { Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppStyles from "./AppStyles";
import { setToken } from "./components/redux/emsSlice";



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MyStack = () => {
  const token = useSelector((state) => state.ems.token);
  
  if (token == "" ){
    return(
      <Login></Login>
    )
  }
  return (

    <>
    
   
    
    <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                tabBarStyle: {
                    height: 85,
                    paddingTop: 10,
                    backgroundColor: "rgb(0,0,0)",
                    borderTopWidth: 0
                },
                tabBarLabelStyle: {
                    marginBottom: 5,
                    paddingBottom: 5,
                    fontSize: 10,
                    fontWeight: "bold"
                },
                tabBarActiveTintColor: "white"
            }}>

            <Tab.Screen name="Home" component={HomeComponents}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, backgroundColor }) => (<Entypo name="home" size={30} color={color} backgroundColor={"black"} />)
                }} />
            <Tab.Screen name="Settings" component={Settings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<EvilIcons name="gear" size={30} color={color} />)
                }} />
            {/* <Tab.Screen name="Library" component={UserActivity}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialIcons name="my-library-music" size={30} color={color} />)
                }} /> */}
        </Tab.Navigator>

        </>
    
  );
}




function HomeComponents(){
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (


    <Stack.Navigator
      initialRouteName="HomeScreen"
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
           //{headerLeft: null}
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
                        dispatch(setToken(""));
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

//  export default App;
