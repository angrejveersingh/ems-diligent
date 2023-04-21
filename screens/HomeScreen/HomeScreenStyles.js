import {StyleSheet} from 'react-native';

const HomeStyle = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
    },
    dropdown: {
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
    placeholderStyle: {
      color: '#fff',
      backgroundColor: '#1d1d1d',
    },
    selectedTextStyle: {
      color: '#fff',
      backgroundColor: '#1d1d1d',
    },
    button:{
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
  });

  export default HomeStyle;