import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Modal,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API } from "@env";
import Dropdown from "../components/Dropdown";
import OrderItem from "../components/OrderItem";
import ModalContent from "../components/Modal";
import Toast from "react-native-toast-message";
import SortDropdown from "../components/SortDropdown";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing
  const [latestOrderTimestamp, setLatestOrderTimestamp] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(API);
      const newPendingOrders = response.data.data.filter(
        (order) => order.status === "pending"
      );

      if (latestOrderTimestamp && newPendingOrders.length > 0) {
        const hasNewPendingOrder = newPendingOrders.some(
          (order) => new Date(order.createdAt).getTime() > latestOrderTimestamp
        );

        if (hasNewPendingOrder) {
          showToast("New Order!", "There are new pending orders available!");
        }
      }

      setAllOrders(response.data.data);

      // Find the maximum timestamp among all orders
      const maxTimestamp = response.data.data.reduce((max, order) => {
        const orderTimestamp = new Date(order.createdAt).getTime();
        return orderTimestamp > max ? orderTimestamp : max;
      }, 0);

      setLatestOrderTimestamp(maxTimestamp);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setRefreshing(false); // Set refreshing state to false after fetching orders
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
    setSelectedSort(null);
  }, [allOrders, selectedStatus]);

  useEffect(() => {
    if (selectedSort === "asc") {
      const sortedOrders = [...orders].sort((a, b) => a.price - b.price);
      setOrders(sortedOrders);
    } else if (selectedSort === "desc") {
      const sortedOrders = [...orders].sort((a, b) => b.price - a.price);
      setOrders(sortedOrders);
    } else if (selectedSort === null) {
      // Restore the original order list by fetching orders again
      fetchOrders();
    }
  }, [selectedSort]);

  const handleOrderItemClick = (order) => {
    if (order.status === "delivered") {
      setSelectedOrder(order);
      setShowModal(true);
    } else {
      navigation.navigate("CurrentOrder", { selectedOrder: order });
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true when refreshing starts
    setSelectedSort(null);
    fetchOrders();
  };

  const showToast = (text1, text2) => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1,
      text2,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
      text1Style: {
        fontSize: 20,
      },
      text2Style: {
        fontSize: 16,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <SortDropdown
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      {orders && (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <OrderItem
              item={item}
              handleOrderItemClick={handleOrderItemClick}
              updateOrders={fetchOrders}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      <Toast />
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
