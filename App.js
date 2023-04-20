 //import { StatusBar } from 'expo-status-bar';
 import { StatusBar } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState } from 'react';
import { Button, Alert, Platform } from 'react-native';

import Signup from './screens/SignUp/Signup';
import { store } from './components/redux/store';
import { Provider } from 'react-redux';
import Login from './screens/Login/Login';
import { useNavigation } from '@react-navigation/native';
import Dashboard from './screens/Dashboard/Dashboard';
import HomeScreen from './screens/HomeScreen/HomeScreen';

import { 
  Text, 
  View
 } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const MyStack = () => {
  const navigation = useNavigation();
  return (
    
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup',gestureEnabled: false }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login',
          gestureEnabled: false
          }
           //{headerLeft: null}
        }
      />
      <Stack.Screen
       name="HomeScreen" 
       component={HomeScreen} 
       options={
         {title: 'HomeScreen',
         gestureEnabled: false,
         headerLeft: null,
         headerRight: () => (
          <Button
            title="Log Out"
            //color="#000"
            onPress={() => {

              if (Platform.OS === 'web') {
                navigation.navigate("Login")
             } else {
              Alert.alert(
                'Caution!',
                "Do you want to log out?",
                [{ text: "Log Out", onPress: () => { navigation.navigate("Login") } },
                { text: "Cancel"}]
                )
             }
              
             
              }}
            
          />
        )}
         // {headerLeft: null}
       }
      />

    
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard',
         gestureEnabled: false,
         headerLeft: null,
         headerRight: () => (
          <Button
            title="Clock Out"
            color="#f00"
            onPress={() => {

              if (Platform.OS === 'web') {
                navigation.navigate("HomeScreen")
             } else {
              Alert.alert(
                'Caution!',
                "Do you want to Clock out?",
                [{ text: "Log Out", onPress: () => { navigation.navigate("HomeScreen") } },
                { text: "Cancel"}]
                )
             }
              
             
              }}
            
          />
        ) }
        //  {headerLeft: null}
       }
      />
    </Stack.Navigator>
  );
}

export default function App () {

  return (
    <Provider store={store}>
      
    <NavigationContainer>
    <StatusBar barStyle="light-content"/>
      <MyStack>
     
      </MyStack>
      
    </NavigationContainer>
    
    </Provider>
  );

}

//  export default App;
