import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default ModalContent = ({ selectedOrder, setShowModal }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {selectedOrder && (
          <View>
            <Text style={styles.modalText}>
              Restaurant: {selectedOrder.restaurant}
            </Text>
            <Text style={styles.modalText}>
              Customer: {selectedOrder.customer}
            </Text>
            <Text style={styles.modalText}>Status: {selectedOrder.status}</Text>
            <Text style={styles.modalText}>Price: ${selectedOrder.price}</Text>
          </View>
        )}
        <TouchableOpacity onPress={() => setShowModal(false)}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#333",
  },
  closeButton: {
    color: "#007bff",
    fontWeight: "bold",
    marginTop: 10,
  },
});
