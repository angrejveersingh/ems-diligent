import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  auth, 
  signInWithEmailAndPassword } from "../../firebase-config";


  import {
    setDisplayName
  } from "../../components/redux/emsSlice";

import { useSelector, useDispatch } from "react-redux";
import { 
  Text, 
  View, 
  StyleSheet,  
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Platform
 } from "react-native";

const Login = ({navigation}) => {


  //const displayName = useSelector((state) => state.ems.displayName);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const userLogin = () => {
    if (email === '' || email == null || password === '' || password == null){
      Alert.alert('Enter details to sign in!');
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
      .then((res)=>{
        //console.log(res.user.displayName);
        dispatch(setDisplayName(res.user.displayName));
        console.log('User logged in successfully');
        setIsLoading(false);
        setEmail(null);
        setPassword(null);
        navigation.navigate('HomeScreen')
      })
      .catch((error)=>{
        console.error(error);
      })
    }
  }

  if(isLoading){
    return(
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    <View style={styles.container}> 
    
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <View style={{ width:"30%", marginLeft:"35%"}}>
      <Button
        color="#3740FE"
        title="Signin"
        style={styles.button}
        onPress={() => userLogin()}
      />  
      </View> 
      <Text 
        style={styles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have account? Click here to signup
      </Text>                          
    </View>
  );
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  button:{
    width: Platform.OS === 'web' ? "30%" : "100%",

  },
  inputStyle: {
    width: Platform.OS === 'web' ? "30%" : "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

 export default Login;