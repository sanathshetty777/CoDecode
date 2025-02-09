// Sidebar.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogOut, BookOpen, CalendarCheck, Phone, Car, CreditCard } from "lucide-react-native";

const { width } = Dimensions.get("window");

const Sidebar = ({ sidebarVisible, slideAnim, toggleSidebar }) => {
  const navigation = useNavigation();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleNavigation = (screen) => {
    toggleSidebar();
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    setLogoutModalVisible(true);
    toggleSidebar();
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate("Login"); // Redirect to Login screen
  };

  return (
    <>
      {sidebarVisible && <TouchableOpacity style={styles.overlay} onPress={toggleSidebar} />} 
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}> 
      <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("Profile")}> 
          <CalendarCheck color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Profile</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("Booking")}> 
          <CalendarCheck color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("Ownedvehicle")}> 
          <Car color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Owned Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("Payment")}> 
          <CreditCard color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Payments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("FAQ")}> 
          <BookOpen color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={() => handleNavigation("Contact")}> 
          <Phone color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.sidebarItem, styles.logoutButton]} onPress={handleLogout}> 
          <LogOut color="#fff" size={24} style={styles.icon} />
          <Text style={styles.sidebarText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.75,
    height: "100%",
    backgroundColor: "#222",
    paddingTop: 50,
    zIndex: 10,
    borderRightWidth: 2,
    borderRightColor: "#444",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  sidebarText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
  },
  icon: {
    marginRight: 5,
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "#b00020",
    marginTop: 20,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 9,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#222",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#888",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#b00020",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Sidebar;
