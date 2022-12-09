import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function ShareFileScreen({ route, navigation }) {
  const { DB, eventInfo } = route.params;

  const createCSV = (data) => {
    let CSVString = "";
    for (let row of data) {
      CSVString += row.join(",") + "\n";
    }
    return CSVString;
  };
  const handleShare = () => {
    const string = createCSV(DB);
    const fileURI = FileSystem.documentDirectory + "MESRac_Attendance.csv";
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
