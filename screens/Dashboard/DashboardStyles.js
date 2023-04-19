
import {StyleSheet, Platform} from 'react-native';



const Dashstyle = StyleSheet.create({
    container: {
      //flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 50,
      //height:400,
      backgroundColor: "#fff",
    },
    taskDisplay: {
      backgroundColor: "rgb(245, 245, 245)",
      paddingBottom: 10,
      borderWidth: 0.5,
      justifyContent: "space-between",
      flexDirection: "row",
      borderRadius: 2,
      //display:"flex",
      width: "100%",
    },
    textStyle: {
      fontSize: 15,
      marginBottom: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      height:Platform.OS === "web" ? 500 : 400,
      width:Platform.OS === "web" ? 700 : 300,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
  });

  export default Dashstyle;

  