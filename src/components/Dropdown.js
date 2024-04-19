import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

export default Dropdown = ({ selectedStatus, setSelectedStatus }) => {
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
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 18, // Increase font size
  },
  dropdown: {
    color: "#fff",
  },
});
