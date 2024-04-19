import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API } from "@env";

const OrderItem = ({ item, handleOrderItemClick }) => {
  const handleAcceptOrder = async () => {
    try {
      // Send a request to update the order status to "accepted"
      await axios.put(`${API}/${item._id}`, {
        status: "accepted",
      });
      // Fetch orders again to update the list
      //   fetchOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
    }
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
        {/* Accept Order Icon */}
        {item.status === "pending" && (
          <TouchableOpacity
            onPress={handleAcceptOrder}
            style={styles.iconContainer}
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
    backgroundColor: "green",
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
