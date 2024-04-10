import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { GET_ALL_ORDERS } from "@env";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("pending"); // State to hold the selected status
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [orders, setOrders] = useState([]); // State to hold orders
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(GET_ALL_ORDERS);
      setAllOrders(() => response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (selectedStatus === "pending") {
      setOrders(allOrders.filter((order) => order.status === "pending"));
    } else if (selectedStatus === "picked") {
      setOrders(allOrders.filter((order) => order.status === "picked up"));
    } else if (selectedStatus === "completed") {
      setOrders(allOrders.filter((order) => order.status === "delivered"));
    } else if (selectedStatus === "accepted") {
      setOrders(allOrders.filter((order) => order.status === "accepted"));
    }
  }, [allOrders, selectedStatus]);

  // Function to handle order item click
  const handleOrderItemClick = (order) => {
    if (order.status === "pending" || order.status === "picked up") {
      // Navigate to CurrentOrder screen and send the selected order as a prop
      navigation.navigate("CurrentOrder", { selectedOrder: order });
    } else if (order.status === "delivered") {
      // Show modal with order details
      setSelectedOrder(order);
      setShowModal(true);
    }
  };

  // Function to filter orders based on the selected status

  return (
    <View style={styles.container}>
      {/* Status dropdown */}
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

      {/* Orders List */}
      {orders && (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOrderItemClick(item)}>
              <View style={styles.orderItem}>
                <Text style={styles.orderText}>
                  Customer Name: {item.customer}
                </Text>
                <Text style={styles.orderText}>
                  Restaurant Name: {item.restaurant}
                </Text>
                <Text style={styles.orderText}>Price: {item.price}</Text>
                <Text style={styles.orderStatus}>Status: {item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Modal for Completed Orders */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <View>
                <Text style={styles.modalText}>
                  Order Number: {selectedOrder.orderNumber}
                </Text>
                <Text style={styles.modalText}>
                  Restaurant: {selectedOrder.restaurant.name}
                </Text>
                <Text style={styles.modalText}>
                  Customer: {selectedOrder.customer.name}
                </Text>
                <Text style={styles.modalText}>
                  Status: {selectedOrder.status}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  dropdownContainer: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  dropdown: {
    color: "#fff",
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatus: {
    color: "#007bff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    color: "#007bff",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default HomeScreen;
