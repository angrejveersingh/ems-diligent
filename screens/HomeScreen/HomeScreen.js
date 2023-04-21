import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
import HomeScreenStyle from "./HomeScreenStyles";
import { useDispatch } from "react-redux";
import {
  setSiteName,
  enableLocation,
  setLocation,
} from "../../components/redux/emsSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

function HomeScreen() {
  const data = [
    { label: "Humberwood", value: "Humberwood" },
    { label: "Elm Drive", value: "Elm" },
    { label: "Braebuen Court", value: "Braeburn" },
    { label: "Queen Street", value: "queenStreet" },
  ];
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [isLocation, gotLocation] = useState(false);

  const handleLocation = async () => {
    try {
      console.log("Got Location");
      const enabled = await Location.hasServicesEnabledAsync();
      console.log("Result", enabled);

      if (!enabled) {
        setMessage("Location is enables");
        return;
      }

      const getResponse = await Location.getForegroundPermissionsAsync();
      console.log(getResponse);

      let granted = getResponse.granted;

      if (granted) {
        gotLocation(true);
      }

      if (!granted) {
        const requestResponse =
          await Location.requestForegroundPermissionsAsync();
        gotLocation(true);
        granted = requestResponse.granted;
      }
      if (granted) {
        dispatch(enableLocation(granted));
      }

      if (!granted) {
        setMessage("Location not authorized");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      dispatch(setLocation(location));
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    handleLocation();
    // alert("Please choose location to continue");
  }, []);

  return (
    <View style={HomeScreenStyle.container}>
      <Dropdown
        style={[
          HomeScreenStyle.dropdown,
          isFocus && { borderColor: "#1d1d1d" },
        ]}
        placeholderStyle={HomeScreenStyle.placeholderStyle}
        selectedTextStyle={HomeScreenStyle.selectedTextStyle}
        inputSearchStyle={HomeScreenStyle.inputSearchStyle}
        iconStyle={HomeScreenStyle.iconStyle}
        data={data}
        search
        maxHeight={300}
        maxWidth={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Location" : "Select Location"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);

          dispatch(setSiteName(item.value));
          setIsFocus(false);
        }}
      />

        <TouchableOpacity
          style={HomeScreenStyle.button}
          onPress={() => {
            value != ""
              ? navigation.navigate("Dashboard")
              : alert("Please select the location");
          }}
        >
          <Text style={HomeScreenStyle.buttonText}>Clock In</Text>
          <Ionicons name="alarm-outline" size={18} color="#000" />
        </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;