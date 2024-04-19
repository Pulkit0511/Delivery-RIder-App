import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "@env";
import Dropdown from "../components/Dropdown";
import OrderItem from "../components/OrderItem";
import ModalContent from "../components/Modal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [allOrders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API);
      setAllOrders(response.data.data);
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

  const handleOrderItemClick = (order) => {
    if (order.status === "delivered") {
      setSelectedOrder(order);
      setShowModal(true);
    } else {
      navigation.navigate("CurrentOrder", { selectedOrder: order });
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      {orders && (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <OrderItem
              item={item}
              handleOrderItemClick={handleOrderItemClick}
            />
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <ModalContent
          selectedOrder={selectedOrder}
          setShowModal={setShowModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default HomeScreen;
