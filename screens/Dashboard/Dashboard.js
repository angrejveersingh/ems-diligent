import React, { useEffect, useState } from "react";

import * as Location from "expo-location";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
// import database from "@react-native-firebase/database";
import DashboardStyle from "./DashboardStyles";

import { useHeaderHeight } from "@react-navigation/stack";
// import KeyboardSpacer from 'react-native-keyboard-spacer'

import Icon from "react-native-vector-icons/FontAwesome";
//import Modal from 'react-native-modal';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Button,
   Modal,
  ScrollView,
  Appearance,
  Platform,
  Pressable,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import {
  //Button,
  Stack,
  TextInput,
  Surface,
} from "@react-native-material/core";
import { db } from "../../firebase-config";

import { onValue, push, remove, ref, update } from "firebase/database";
//import Bonsai from "./Bonsai";
import { useSelector, useDispatch } from "react-redux";
import { launchCameraAsync } from "expo-image-picker";
import Ionicons from '@expo/vector-icons/Ionicons';


const Dashboard = ({ navigation }) => {
  const data = [
    { label: "Humberwood", value: "Humberwood" },
    { label: "Elm Drive", value: "Elm" },
    { label: "Braebuen Court", value: "Braeburn" },
    { label: "Queen Street", value: "queenStreet" },
  ];

  const displayName = useSelector((state) => state.ems.displayName);
  const siteName = useSelector((state) => state.ems.siteName);
  const lat = useSelector((state) => state.ems.lat);
  const long = useSelector((state) => state.ems.long);
  const isLocationEnabled = useSelector((state) => state.ems.isLocationEnabled);
  const [modalVisible, setModalVisible] = useState(false);

  const [values, setValue] = useState("");
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var finalDate = date + "-" + month + "-" + year;
  const dbRef = ref(db, `${siteName}/${finalDate}/DOR/${displayName}`);
  const [isFocus, setIsFocus] = useState(false);
  const [tasks, setBonsais] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [currentKey, updateKey] = useState("");
  const [currentTime, updateTime] = useState(0);
  //const [editTask, editDescription] = useState("");
  const [updatedTask, updateTask] = useState("");
  const bonsaisKeys = Object.keys(tasks);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [firstTasks, setfirstTask] = useState("");
  const [checkData, updateCheckData] = useState([]);
  const [firstKey,updateFirstKey]= useState("");

  const dataRender = (data, rowMap) => (
    //console.log("check render data",data)
    <SwipeRow
    disableLeftSwipe={data.item.key == firstKey}
    disableRightSwipe={true}

    rightOpenValue={-70}>


         <TouchableOpacity
            style={[
              DashboardStyle.backRightBtn,
              DashboardStyle.backRightBtnRight,
            ]}
            onPress={async () => {
              rowMap[data.item.key].closeRow();
              setModalVisible(!modalVisible);
              updateKey(data.item.key);
              updateTime(data.item.time);
              updateTask(data.item.description);
              await handelMyLocation();
              //console.log(rowMap, rowKey);
              
            }}
          >
            <Text style={DashboardStyle.backTextWhite}>Edit</Text>
          </TouchableOpacity>


    <TouchableHighlight
   
    leftOpenValue={20 + Math.random() * 150}
    rightOpenValue={-150} 
      onPress={() => console.log("You touched me")}
      style={DashboardStyle.rowFront}
      underlayColor={"#AAA"}
    >
      <View
        style={DashboardStyle.list}
      >
        <Text>{data.item.description}</Text>
        <Text style={DashboardStyle.listTime}>{data.item.time}</Text>
      </View>
    </TouchableHighlight>
    </SwipeRow>
  );
 
  // const onRowDidOpen = (data, rowMap)=>{
  //   if (data.item.key == firstKey){
  //     rowMap[data.item.key].closeRow();
  //   }
  // };

  const onRowDidOpen = (rowKey, rowMap) => {
    console.log('This row opened', rowKey);
    if (rowKey == firstKey){
          rowMap[rowKey].closeRow();
        }
};

  const checkDataUpdate = () => {
    var tempArray = [];
    console.log("Check updatttt data",bonsaisKeys);
    bonsaisKeys.map((key) => {
      tempArray.push({
        key: key,
        time: tasks[key].time,
        description: tasks[key].description,
      });
    });
    updateCheckData(tempArray);
    console.log("Check updatttt data",checkData);
  };

  // useEffect(() => {
  //   bonsaisKeys.map((key) => {
  //     checkData.push({
  //       key: key,
  //       time: tasks[key].time,
  //       description: tasks[key].description,
  //     });
  //   });
  //   //console.log("Check data", checkData);
  // }, []);

  const rightButtons = (data, rowMap, rowKey) => (
    <View style={DashboardStyle.rowBack}>
      {bonsaisKeys[0] == data.item.key ? (
        <></>
      ) : (
        <>
          <TouchableOpacity
            style={[
              DashboardStyle.backRightBtn,
              DashboardStyle.backRightBtnRight,
            ]}
            onPress={async () => {
              rowMap[data.item.key].closeRow();
              setModalVisible(!modalVisible);
              updateKey(data.item.key);
              updateTime(data.item.time);
              updateTask(data.item.description);
              await handelMyLocation();
              //console.log(rowMap, rowKey);
              
            }}
          >
            <Text style={DashboardStyle.backTextWhite}>Edit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  

  const handelMyLocation = async () => {
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

      if (!granted) {
        const requestResponse =
          await Location.requestForegroundPermissionsAsync();
        console.log(requestResponse);
        // return;
        granted = requestResponse.granted;
      }

      if (!granted) {
        setMessage("Location not authorized");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      //console.log(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onPressEdit = (key, time, task) => {
    console.log("Edit pressed", key);
    // database()
    //   .ref(`${siteName}/${finalDate}/"DOR"/${displayName}/${key}`)
    //   .update({
    //     description: "Updated",
    //   })
    //   .then(() => console.log("Data updated."));
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var finalDates = date + "-" + month + "-" + year;
    //const dbRefTs = ref(db, `${siteName}/${finalDates}/"DOR"/${displayName}/${key}`);
    // (dbRefTs, {
    //   description: "Updated",
    // });
    update(ref(db, `${siteName}/${finalDates}/DOR/${displayName}`), {
      [key]: {
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        time: time,
        description: task,
      },
    });
  };

  const firstTask = async () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var finalDates = date + "-" + month + "-" + year;
    const dbRefT = ref(db, `${siteName}/${finalDates}/DOR/${displayName}`);
    //console.log("Check Location", tasks);
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var finalTime = hours + ":" + min;
    console.log("currentBonsai", finalTime);

    if (isLocationEnabled) {
      setTimeout(() => {
        push(dbRefT, {
          location: {
            latitude: lat,
            longitude: long,
          },
          time: finalTime,
          description: "Shift Started",
        });
        setCurrentTask("");
      }, 500);
    } else {
      alert("Please allow location from the device settings");
    }
  };

  useEffect(() => {
    // while (!isLocationEnabled) {
    //   alert("Please allow location from the device settings");
    // }

    return onValue(dbRef, (querySnapshot) => {
      console.log("Check Apperance", Appearance.getColorScheme());
      //console.log("querySnapshot", dbRef);
      let data = querySnapshot.val() || {};
      let tasks = { ...data };
      console.log("Tasks", tasks == {});
      setBonsais(tasks);
      var checkKeys = Object.keys(tasks);
     // console.log("TASK LENGTH", bonsaisKeys);

      if (checkKeys.length == 0) {
        firstTask();
      }
      var tempArray = [];
   updateFirstKey(checkKeys[0]);
    checkKeys.map((key) => {
      tempArray.push({
        key: key,
        time: tasks[key].time,
        description: tasks[key].description,
      });
    });
    updateCheckData(tempArray);
    });
  }, [values, finalDate, displayName, isLocationEnabled]);

  const addNewBonsai = async () => {
    console.log("Check Location", checkData);
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var finalTime = hours + ":" + min;
    console.log("currentBonsai", finalTime);
    

    if (isLocationEnabled) {
      setTimeout(() => {
        push(dbRef, {
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          time: finalTime,
          description: currentTask,
        });
        setCurrentTask("");
      
    
   
      }, 300);
    } else {
      alert(
        "Please wait for device to access the location or enable it from device setting"
      );
    }
  };

  const clearBonsais = () => {
    remove(dbRef);
  };

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 100} 
        style={{ flex: 1 }}
      >
        <View

        //DashboardStyle={DashboardStyle.container}
        // contentContainerStyle={DashboardStyle.contentContainerStyle}
        >
          {Platform.OS == "web" ? (
            <>
              {bonsaisKeys.map((key) => (
                <View style={DashboardStyle.taskDisplay} key={key}>
                  {console.log(bonsaisKeys.length)}
                  <Text key={key}>
                    {tasks[key].time} {tasks[key].description}{" "}
                  </Text>
                  {bonsaisKeys[0] == key ? (
                    console.log("Hello edit", bonsaisKeys[0].key)
                  ) : (
                    <TouchableOpacity
                      onPress={async () => {
                        setModalVisible(!modalVisible);
                        updateKey(key);
                        updateTime(tasks[key].time);
                        updateTask(tasks[key].description);
                        await handelMyLocation();
                      }}
                    >
                      <Icon name="edit" size={30} color="#900" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </>
          ) : (
            <SwipeListView
              style={{ height: "88%" }}
              horizontal={false}
              nestedScrollEnabled={true}
              data={checkData}
              renderItem={dataRender}
              // renderHiddenItem={rightButtons}
              // //leftOpenValue={0}

              // rightOpenValue={-70}
              // previewRowKey={"0"}
              // previewOpenValue={-40}
              // previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          )}
          <Modal
            animationType="slide"
           //transparent={true}
           presentationStyle="formSheet"
            visible={modalVisible}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={DashboardStyle.centeredView}>
              <View style={DashboardStyle.modalView}>
                <TextInput
                  label="update Task"
                  editable
                  multiline
                  numberOfLines={5}
                  //maxLength={}
                  value={updatedTask}
                  style={{
                    width: Platform.OS === "web" ? 600 : 250,
                    padding: 1,
                    // height: 300,
                  }}
                  onChangeText={(text) => {
                    // console.log("updatedTask", text);
                    updateTask(text);
                  }}
                  // onSubmitEditing={onValue}
                />
                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[
                      DashboardStyle.button,
                      DashboardStyle.buttonClose,
                      { marginRight: 5 },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      onPressEdit(currentKey, currentTime, updatedTask);
                      updateTask("");
                    }}
                  >
                    <Text>Update</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      DashboardStyle.button,
                      DashboardStyle.buttonClose,
                      { marginLeft: 5 },
                    ]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Ionicons name="close-outline" size={18} color="#fff"/>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {/* <Stack m={4} spacing={2} divider={true}></Stack> */}

          <View style={DashboardStyle.inputWrap}>
            <TextInput
              label="New Task"
              editable
              multiline
              numberOfLines={5}
              onFocus={() => {
                console.log("Checks focus");
              }}
              //maxLength={}
              value={currentTask}
              style={DashboardStyle.taskInput}
              onChangeText={async (text) => {
                console.log("Task", text);

                setCurrentTask(text);
                await handelMyLocation();
              }}
              onSubmitEditing={addNewBonsai}
            />
                <TouchableOpacity style={DashboardStyle.submitBtn} disabled={currentTask == ""} onPress={() => {
                    addNewBonsai();
                    checkDataUpdate();
                  }}>
                  <Ionicons name="checkmark-outline" size={18} color="#fff"/>
                </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
};
// references:
// https://dev.to/adii9/uploading-images-to-firebase-storage-in-react-native-with-expo-workflow-24kj
// https://www.kindacode.com/article/image-picker-in-react-native/
// https://firebase.google.com/docs/firestore/manage-data/add-data

export default Dashboard;
