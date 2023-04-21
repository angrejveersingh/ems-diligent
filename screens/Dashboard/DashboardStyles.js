
import {StyleSheet, Platform} from 'react-native';



const Dashstyle = StyleSheet.create({
    container: {
      //flex: 1,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 50,
      //height:400,
      backgroundColor: "#fff",
      gap: 10,
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
      // height:Platform.OS === "web" ? 500 : 400,
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
      backgroundColor: '#fff',
      borderBottomColor: '#f1f1f1',
      borderWidth: 0.5,
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
  list: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-start",
    width: '100%',
  },
  listTime: {
    width: '100%',
    fontSize: 10,
    textAlign: 'right',
  },
  inputWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#d1d1d1',
    gap: 10,
    width: '100%',
  },
  taskInput: { 
    // width: Platform.OS === "web" ? 700 : 350, 
    flex: 6,
    backgroundColor: '#d1d1d1',
    borderWidth: 0,
    borderRadius: 50,
  },
  submitBtn: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderRadius: 50,
  }
  });

  export default Dashstyle;

  