import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SortDropdown = ({ selectedSort, setSelectedSort }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(itemValue) => setSelectedSort(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Sort By" value={null} color="#777" />
        <Picker.Item label="Price - Low to High" value="asc" />
        <Picker.Item label="Price - High to Low" value="desc" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdown: {
    height: 40,
    width: "100%",
    color: "#333",
  },
});

export default SortDropdown;
