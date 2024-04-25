import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API } from "@env";
import Toast from "react-native-toast-message";

const OrderItem = ({ item, handleOrderItemClick, updateOrders }) => {
  const handleOrderAction = async (status) => {
    const statusMap = {
      accept: "accepted",
      pick: "picked up",
      complete: "delivered",
    };

    try {
      await axios.put(`${API}/${item._id}`, {
        status: statusMap[status],
      });
      updateOrders();
      showToast(`Order status successfully updated to ${statusMap[status]}`);
    } catch (error) {
      console.error(`Error ${status}ing order:`, error);
    }
  };

  const showToast = (message) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success!",
      text2: message,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      text1Style: {
        fontSize: 16,
      },
      text2Style: {
        fontSize: 14,
      },
    });
  };

  return (
    <TouchableOpacity onPress={() => handleOrderItemClick(item)}>
      <View style={styles.orderItem}>
        <Text style={styles.orderTitle}>Restaurant: </Text>
        <Text style={styles.orderInfo}>{item.restaurant}</Text>
        <Text style={styles.orderTitle}>Customer: </Text>
        <Text style={styles.orderInfo}>{item.customer}</Text>
        <Text style={styles.orderTitle}>Price: </Text>
        <Text style={styles.orderInfo}>${item.price}</Text>
        {/* Check mark for accepted order */}
        {item.status === "accepted" && (
          <TouchableOpacity
            onPress={() => handleOrderAction("pick")}
            style={[styles.iconContainer, { backgroundColor: "blue" }]}
          >
            <FontAwesomeIcon icon={faCheck} style={styles.acceptIcon} />
          </TouchableOpacity>
        )}
        {/* Check mark for picked order */}
        {item.status === "picked up" && (
          <TouchableOpacity
            onPress={() => handleOrderAction("complete")}
            style={[styles.iconContainer, { backgroundColor: "orange" }]}
          >
            <FontAwesomeIcon icon={faCheck} style={styles.acceptIcon} />
          </TouchableOpacity>
        )}
        {/* Check mark for pending order */}
        {item.status === "pending" && (
          <TouchableOpacity
            onPress={() => handleOrderAction("accept")}
            style={[styles.iconContainer, { backgroundColor: "green" }]}
          >
            <FontAwesomeIcon icon={faCheck} style={styles.acceptIcon} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    position: "relative",
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
  },
  orderInfo: {
    fontSize: 12,
    color: "#666",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "40%",
    right: "5%",
  },
  acceptIcon: {
    color: "#fff",
    fontSize: 20,
  },
});

export default OrderItem;
