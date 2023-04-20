import {StyleSheet} from 'react-native';

const HomeStyle = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      //  padding: 35,
      //  width:"100%",
      backgroundColor: "#fff",
    },
    signInButton:{
      width:100,
      paddingTop:"50px"
      //paddingTop: 35,
      // justifyContent: "center",
      // alignItems: "center  ",
    },
    dropdown: {
      height: 50,
      width:"50%",
      borderColor: "gray",
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
  });

  export default HomeStyle;