import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Dummy data
import ordersData from "../data/ordersData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("pending"); // State to track selected tab
  const [orders, setOrders] = useState(ordersData); // State to hold orders data
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold the selected order
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

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

  // Function to filter orders based on the selected tab
  useEffect(() => {
    if (selectedTab === "pending") {
      setOrders(ordersData.filter((order) => order.status === "pending"));
    } else if (selectedTab === "picked") {
      setOrders(ordersData.filter((order) => order.status === "picked up"));
    } else if (selectedTab === "completed") {
      setOrders(ordersData.filter((order) => order.status === "delivered"));
    }
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("pending")}
          style={[
            styles.tabButton,
            selectedTab === "pending" && styles.selectedTabButton,
          ]}
        >
          <Text>Pending Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("picked")}
          style={[
            styles.tabButton,
            selectedTab === "picked" && styles.selectedTabButton,
          ]}
        >
          <Text>Picked Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("completed")}
          style={[
            styles.tabButton,
            selectedTab === "completed" && styles.selectedTabButton,
          ]}
        >
          <Text>Completed Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOrderItemClick(item)}>
            <View style={styles.orderItem}>
              <Text>Order Number: {item.orderNumber}</Text>
              <Text>Restaurant: {item.restaurant.name}</Text>
              <Text>Customer: {item.customer.name}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

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
                <Text>Order Number: {selectedOrder.orderNumber}</Text>
                <Text>Restaurant: {selectedOrder.restaurant.name}</Text>
                <Text>Customer: {selectedOrder.customer.name}</Text>
                <Text>Status: {selectedOrder.status}</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Close</Text>
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
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tabButton: {
    padding: 10,
  },
  selectedTabButton: {
    borderBottomWidth: 2,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
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
});

export default HomeScreen;
