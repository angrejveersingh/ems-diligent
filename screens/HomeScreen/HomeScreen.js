//import AwesomeButton from "react-native-really-awesome-button";
import { Text, View, HomeScreenStyleheet, Button, StyleSheet,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
//import HomeScreenStyle from "./HomeScreenStyles";
import { useSelector, useDispatch } from "react-redux";
import { setSiteName, enableLocation, setLocation } from "../../components/redux/emsSlice";


function HomeScreen() {
  const data = [
    { label: "Humberwood", value: "Humberwood" },
    { label: "Elm Drive", value: "Elm" },
    { label: "Braebuen Court", value: "Braeburn" },
    { label: "Queen Street", value: "queenStreet" },
  ];
  const dispatch = useDispatch();
  //const siteName = useSelector((state) => state.ems.siteName);

  const [value, setValue] = useState("");
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  


  const [isFocus, setIsFocus] = useState(false);
  const [isLocation, gotLocation] = useState(false);

  const handleLocation = async()=>{
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
        //console.log(requestResponse);
        gotLocation(true);
        // return;
        granted = requestResponse.granted;
      }
     // console.log("Granted",granted);
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

      //console.log(location);
      
       // console.log("requestResponse", isLocation);
        dispatch(setLocation(location));
      // setLatitude(location.coords.latitude);
      // setLongitude(location.coords.longitude);

      // setMessage(
      //   <View>
      //     <Text>Latitude: {location.coords.latitude}</Text>
      //     <Text>Longitude: {location.coords.longitude}</Text>
      //   </View>
      // );
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(()=>{
  handleLocation();
  alert("Please choose location to continue");
    
  },[])

  
  return (
<View style={HomeScreenStyle.container}>
    <Dropdown
          style={[HomeScreenStyle.dropdown, isFocus && { borderColor: "blue"}]}
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

    <View HomeScreenStyle={{paddingTop:50}}>
    <Button
      title="Clock In"
      //HomeScreenStyle={HomeScreenStyle.signInButton}
      //backgroundColor="green"
      // progress
      //width={100} 
      //onProgressEnd={navigation.navigate("Dashboard")}
      onPress={ ()=>{
        //async (next) => {
        /** await for something; then: **/
        
        console.log("Button pressed");
        // next();
          if (value != "") {
            navigation.navigate("Dashboard");
          }else{
            alert("Please select the location");
          }
          
       
        //<Text>SignedIN</Text>
      }
    }
    >
      
      
    </Button>
    </View>

    </View>
   
  );
}

const HomeScreenStyle = StyleSheet.create({
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




export default HomeScreen;