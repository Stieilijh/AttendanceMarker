import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function EventInfoScreen({ navigation, route }) {
  const { DB, positions } = route.params;
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventName, setEventName] = useState("");
  const startScanning = () => {
    if (eventName == "") {
      alert("Name can't  be empty");
      return;
    }
    if (date == "") {
      alert("Date is empty");
      return;
    }
    const data = {
      eventInfo: { eventName, date: dateString(date) },
      DB,
      positions,
    };
    // navigation.navigate("BarcodeScreen", { data });
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  const dateString = (date) => {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [
      (dd > 9 ? "" : "0") + dd,
      "/",
      (mm > 9 ? "" : "0") + mm,
      "/",
      date.getFullYear(),
    ].join("");
  };
  return (
    <View style={styles.container}>
      <Text>Enter the Event Name </Text>
      <TextInput
        style={styles.input}
        placeholder="Event-Name"
        onChangeText={setEventName}
      />
      <Text>Date: {dateString(date)}</Text>
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={{ color: "white" }}>Change Date</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity style={styles.button} onPress={startScanning}>
        <Text style={{ color: "white" }}>Start Scanning</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    color: "white",
    margin: 10,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  input: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    margin: 20,
  },
});
