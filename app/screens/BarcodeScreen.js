import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Audio } from "expo-av";
import Dialog from "react-native-dialog";

export default function BarcodeScreen({ route, navigation }) {
  //Sound
  const [sound, setSound] = React.useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/beep.mp3")
    );
    setSound(sound);
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  //__
  const [alertVisible, setAlertVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState("Not yet scanned");
  const [attendance, setAttendance] = useState([]);
  const [classNSec, setClassNSec] = useState([]);
  const eventData = route.params;
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    return;
    const index = IDARR.indexOf(data);
    if (index == -1) return;
    const name = NAMEARR[index];
    if (name == null) {
      return;
    }
    if (attendance.includes(name)) {
      return;
    }

    //can't name it classNSec because that is one of our states
    const classN = CLASSNSECARR[IDARR.indexOf(data)];
    if (classN == null) {
      classN = "NaN";
    }
    playSound();
    setText(name + "\n" + classN);
    const temp = attendance;
    temp.push(name);
    setAttendance(temp);
    const temp1 = classNSec;
    temp1.push(classN);
    setClassNSec(temp1);
  };

  const handleStopScanning = () => {
    stopAlert();
    if (attendance.length == 0) {
      alert("0 attendance does not make sense!!");
      return;
    }
    const eventInfo = eventData.data.eventInfo;
    const dataForFile = { eventInfo, attendance, classNSec };
    navigation.navigate("ShareFileScreen", { dataForFile });
  };
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera please"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  const stopAlert = () => {
    setAlertVisible(false);
  };
  const showAlert = () => {
    setAlertVisible(true);
  };

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Dialog.Container visible={alertVisible}>
        <Dialog.Title>Stop Scanning</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to end Scanning?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={stopAlert} />
        <Dialog.Button label="Confirm" onPress={handleStopScanning} />
      </Dialog.Container>
      <Text style={styles.maintext}>{text}</Text>
      <TouchableOpacity onPress={showAlert} style={styles.Button}>
        <Text style={{ color: "white" }}>End Scanning</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  Button: {
    alignItems: "center",
    margin: 10,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
