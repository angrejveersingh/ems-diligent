import { StyleSheet } from 'react-native';

const AppStyles = StyleSheet.create({
  container:{
    backgroundColor: "#000",
  },
    button:{
      backgroundColor: '#d21404',
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      gap: 5,
      marginRight: 10,
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 600,
    }
  });

  export default AppStyles;