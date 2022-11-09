import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function ShareFileScreen({ route, navigation }) {
  const { dataForFile } = route.params;

  const eventName = dataForFile.eventInfo.eventName;
  const eventDate = dataForFile.eventInfo.date;
  const attendance = dataForFile.attendance;
  const classNSec = dataForFile.classNSec;

  const createCSVFile = () => {
    let csvData = "";
    //Header
    csvData += `Date,EventName,Full Name,Address\n`;
    //names
    for (let i in attendance) {
      csvData += `${eventDate},${eventName},${attendance[i]},${classNSec[i]}\n`;
    }
    return csvData;
  };

  const handleShare = () => {
    const string = createCSVFile();
    const fileURI =
      FileSystem.documentDirectory + eventName + "_Attendance.csv";
    FileSystem.writeAsStringAsync(fileURI, string);
    Sharing.isAvailableAsync().then(async () => {
      Sharing.shareAsync(fileURI);
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShare} style={styles.Button}>
        <Text style={{ color: "white" }}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
