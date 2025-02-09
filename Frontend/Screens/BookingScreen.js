// BookingScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

const BookingScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingRecords, setBookingRecords] = useState([]);

  const filteredBookings = bookingRecords.filter((record) =>
    record.date.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search by date (DD-MM-YYYY)"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Mode</Text>
          <Text style={styles.headerCell}>Date & Time</Text>
          <Text style={styles.headerCell}>Route</Text>
          <Text style={styles.headerCell}>Fare (₹)</Text>
        </View>

        {filteredBookings.length === 0 ? (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No Records Found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredBookings}
            keyExtractor={(item) => item.bookingId.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.serviceUsed}</Text>
                <Text style={styles.cell}>{item.dateTime}</Text>
                <Text style={styles.cell}>{item.route}</Text>
                <Text style={styles.cell}>₹ {item.totalFare}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  searchContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { fontSize: 14, color: "#000" },
  noRecordsContainer: { padding: 20, alignItems: "center" },
  noRecordsText: { fontSize: 16, color: "#888" },
  tableContainer: { backgroundColor: "white", borderRadius: 8, padding: 8, elevation: 2 },
  tableHeader: { flexDirection: "row", backgroundColor: "#E0E0E0", padding: 8 },
  tableRow: { flexDirection: "row", padding: 8, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  headerCell: { flex: 1, fontWeight: "bold", textAlign: "center" },
  cell: { flex: 1, textAlign: "center", color: "#333" },
});

export default BookingScreen;