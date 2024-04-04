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
          <Text
            style={[
              styles.tabText,
              selectedTab === "pending" && styles.activeTabText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("picked")}
          style={[
            styles.tabButton,
            selectedTab === "picked" && styles.selectedTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "picked" && styles.activeTabText,
            ]}
          >
            Picked
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("completed")}
          style={[
            styles.tabButton,
            selectedTab === "completed" && styles.selectedTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOrderItemClick(item)}>
            <View style={styles.orderItem}>
              <Text style={styles.orderText}>
                Order Number: {item.orderNumber}
              </Text>
              <Text style={styles.orderText}>
                Restaurant: {item.restaurant.name}
              </Text>
              <Text style={styles.orderText}>
                Customer: {item.customer.name}
              </Text>
              <Text style={styles.orderStatus}>Status: {item.status}</Text>
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
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#007bff",
  },
  tabButton: {
    padding: 10,
  },
  selectedTabButton: {
    borderBottomWidth: 2,
    borderColor: "#007bff",
  },
  tabText: {
    fontWeight: "bold",
    color: "#888",
  },
  activeTabText: {
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
