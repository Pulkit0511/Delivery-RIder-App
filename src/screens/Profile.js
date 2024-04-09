import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Pic */}
      <View style={styles.profilePicContainer}>
        {/* Placeholder for profile pic */}
        <FontAwesome5 name="user-circle" size={100} color="#333" />
      </View>
      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
      {/* Logout Icon */}
      <TouchableOpacity style={styles.logoutButton}>
        <FontAwesome5 name="sign-out-alt" size={24} color="#333" />
      </TouchableOpacity>
      {/* Options */}
      <View style={styles.optionsContainer}>
        <OptionItem icon="truck" label="All Deliveries" />
        <OptionItem icon="history" label="Payment History" />
        <OptionItem icon="store" label="Service Center" />
        <OptionItem icon="cog" label="Settings" />
      </View>
    </View>
  );
};

const OptionItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.optionItem}>
    <FontAwesome5 name={icon} size={24} color="#007bff" />
    <Text style={styles.optionLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  profilePicContainer: {
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  logoutButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;
