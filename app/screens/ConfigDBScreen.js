import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import * as DocumentPicker from "expo-document-picker";

//Removes empty spaces before and after each element of an array
const trimSpacesOfEachElement = (arr) => {
  let newArr = [];
  for (let i of arr) {
    let u = i.toString();
    u = u.trim();
    newArr.push(u);
  }
  return newArr;
};

export default function ConfigDBScreen({ navigation }) {
  let result;
  const pickDocument = async () => {
    result = await DocumentPicker.getDocumentAsync({});
    verifyFile(result);
  };
  const verifyFile = (file) => {
    //checks if the given file is .xlsx
    // add && file.name==DB_FILE_NAME later
    if (file.name.split(".").pop() == "csv") {
      readDB(file);
    } else {
      alert("Invalid file!!");
    }
  };
  const readDB = (file) => {
    let arrData = [];
    fetch(file.uri)
      .then(async (response) => {
        const resp = await response.text();
        const data = resp.split("\n");
        for (let i of data) {
          let j = i.split(",");
          arrData.push(trimSpacesOfEachElement(j));
        }
        let nameInt, idInt, addressInt;
        const header = arrData[0];
        for (let i in header) {
          const k = header[i].toUpperCase();
          if (k == "NAME") {
            nameInt = i;
          } else if (k == "ID") {
            idInt = i;
          } else if (k == "ADDRESS") {
            addressInt = i;
          }
        }
        if (nameInt == null || idInt == null || addressInt == null) {
          alert(
            "The given file does not have all the required columns (name, id,Address).\nMake sure the columns are named correctly!!"
          );
          return;
        }
        navigation.navigate("EventInfoScreen", {
          DB: arrData,
          positions: { name: nameInt, id: idInt, address: addressInt },
        });
      })
      .catch((error) => {
        console.log("Error : " + error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 40 }}>
        Select the latest version of Rotaract Member Database
      </Text>
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <Text style={{ color: "white" }}>Import Database</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    color: "white",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    margin: 20,
  },
});
