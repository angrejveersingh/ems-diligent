import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from "../../firebase-config";
import { setDisplayName } from "../../components/redux/emsSlice";
import { useDispatch } from "react-redux";
import { Text, View, TextInput, Button, ActivityIndicator, Alert, Image, TouchableOpacity } from "react-native";
import LoginStyles from "./LoginStyles";
import Ionicons from '@expo/vector-icons/Ionicons';

const Login = ({navigation}) => {
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
      <View style={LoginStyles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    )
  }

  return (
    <View style={LoginStyles.container}> 
      <Text 
        style={LoginStyles.header}>
        Don't have account? Click here to signup
      </Text>
      <Image
        source={require('../../assets/diligent-logo.png')}
        style={LoginStyles.logo}
      />
      <TextInput
        style={LoginStyles.inputStyle}
        placeholder="Email"
        placeholderTextColor='#fff'
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={LoginStyles.inputStyle}
        placeholder="Password"
        placeholderTextColor='#fff'
        value={password}
        onChangeText={(val) => setPassword(val)}
        maxLength={15}
        secureTextEntry={true}
      />   
      <View style={{ width:"30%", marginLeft:"35%"}}>
      {/* <Button
        title="Signin"
        color='#fff'
        style={LoginStyles.button}
        onPress={() => userLogin()}
      />   */}
      <TouchableOpacity style={LoginStyles.button} onPress={() => userLogin()}>
        <Text style={LoginStyles.buttonText}>Sign In</Text>
        <Ionicons name="log-in-outline" size={18} color="#000" />
      </TouchableOpacity>
      </View> 
      <Text 
        style={LoginStyles.loginText}
        onPress={() => navigation.navigate('Signup')}>
        Don't have account? Click here to signup
      </Text>
    </View>
  );
 }

 export default Login;