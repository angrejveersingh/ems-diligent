import { StyleSheet, Platform } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      paddingHorizontal: 35,
      paddingVertical: 86,
      backgroundColor: '#000',
    },
    logo: {
      width: 220, 
      height: 84,
      alignSelf: "center",
      marginBottom: 54,
      borderRadius: 10,
    },
    inputStyle: {
      // width: Platform.OS === 'web' ? "30%" : "100%",
      width: '100%',
      maxWidth: 320,
      marginBottom: 18,
      paddingVertical: 10,
      paddingHorizontal: 14,
      alignSelf: "center",
      borderWidth: 0,
      borderRadius: 5,
      color: '#fff',
      backgroundColor: '#1d1d1d',
    },
    button:{
      // width: Platform.OS === 'web' ? "30%" : "100%",
      backgroundColor: '#fff',
      alignSelf: "center",
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 5,
      marginTop: 16,
      marginBottom: 48,
      display: "flex",
      flexDirection: "row",
      gap: 5,
    },
    buttonText:{
      color: '#000',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 600,
    },
    loginText: {
      color: '#fff',
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

  export default LoginStyles;