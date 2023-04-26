import { StyleSheet, Appearance } from "react-native";

const SettingStyle = StyleSheet.create({
    container:{
        backgroundColor: "#000",
        flex:1
        
    },
    textStyle:{
        color:"#fff",
        fontSize: 16,
        fontWeight: 600,
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
})

export default SettingStyle;