import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet, Text } from "react-native";

const Dropdown = ({ selectedStatus, setSelectedStatus }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedStatus}
        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Pending Orders" value="pending" />
        <Picker.Item label="Accepted Orders" value="accepted" />
        <Picker.Item label="Picked Orders" value="picked" />
        <Picker.Item label="Completed Orders" value="completed" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007bff",
    overflow: "hidden",
    elevation: 3,
    marginBottom: 6,
  },
  dropdown: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Dropdown;
