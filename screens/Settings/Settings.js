import { Text, View, Pressable, TouchableOpacity, Alert } from "react-native";
import SettingStyle from "./SettingStyle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { setToken } from "../../components/redux/emsSlice";



export default function(){
    const displayName = useSelector((state) => state.ems.displayName);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    return(
        <View style={SettingStyle.container}>
            <Text style={SettingStyle.textStyle}>Hello {displayName}</Text>
            <TouchableOpacity>
                <Text style={SettingStyle.textStyle}>Profile</Text>
            </TouchableOpacity >
            <TouchableOpacity style={SettingStyle.button} onPress={() => {
                if (Platform.OS === "web") {
                  navigation.navigate("Login");
             } else {
                  Alert.alert("Caution!", "Do you want to log out?", [
                    {
                      text: "Log Out",
                      onPress: () => {
                        dispatch(setToken(""));
                        navigation.navigate("Login");

                      },
                    },
                    { text: "Cancel" },
                  ]);
             }
              }}>
                <Text style={SettingStyle.buttonText}>Log out</Text>
                <Ionicons name="log-out-outline" size={18} color="#fff" />
              </TouchableOpacity>
        </View>
    )
   
}