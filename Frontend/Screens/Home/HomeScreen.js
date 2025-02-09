import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";

const { width } = Dimensions.get("window");

const GOOGLE_PLACES_API_KEY = "AlzaSykXI5323GbOsqzjj57klyhYjptiX-nmkIw";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];
  const [searchQuery, setSearchQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const apps = [
    { name: "App One",  price: "₹100" },
    { name: "App Two",  price: "₹150" },
    { name: "App Three", price:"₹200" },
  ];

  const fetchSuggestions = async (input, isDestination = false) => {
    if (isDestination) {
      setDestinationQuery(input);
    } else {
      setSearchQuery(input);
    }

    if (input.length > 2) {
      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();
        setSuggestions(data.predictions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const transportIcons = {
    car: "car-sport-outline",
    auto: "car-outline",
    bus: "bus-outline",
    walk: "walk-outline",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>BookMe</Text>
          <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}> 
          <Ionicons name="search" size={20} color="#007AFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Your location"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={(text) => fetchSuggestions(text)}
          />
        </View>

        <View style={styles.searchContainer}> 
          <Ionicons name="location-outline" size={20} color="#007AFF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Destination"
            placeholderTextColor="#666"
            value={destinationQuery}
            onChangeText={(text) => fetchSuggestions(text, true)}
          />
        </View>

        <View style={styles.mapContainer}>
          <MapComponent searchLocation={searchLocation} destinationLocation={destinationLocation} />
        </View>

        <View style={styles.transportOptions}>
          {Object.keys(transportIcons).map((mode) => (
            <TouchableOpacity key={mode} style={styles.transportButton}>
              <Ionicons name={transportIcons[mode]} size={40} color="#007AFF" />
              <Text>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.appListContainer}>
          {apps.map((app, index) => (
            <View key={index} style={styles.appItem}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appPrice}>{app.price}</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>BOOK</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  if (destinationQuery) {
                    setDestinationLocation(item);
                  } else {
                    setSearchLocation(item);
                  }
                  setSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Sidebar
          sidebarVisible={sidebarVisible}
          slideAnim={slideAnim}
          toggleSidebar={toggleSidebar}
          setLogoutModalVisible={setLogoutModalVisible}
        />

        <Modal transparent visible={logoutModalVisible} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButtonCancel}
                  onPress={() => setLogoutModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonConfirm}
                  onPress={() => navigation.navigate("Auth")}
                >
                  <Text style={styles.modalButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    paddingTop: Platform.OS === "android" && StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  menuButton: {
    padding: 5,
  },
  cancelButton: {
    padding: 5,
  },
  cancelText: {
    color: "#007AFF",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  mapContainer: {
    flex: 1,
  },
  transportOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  transportButton: {
    alignItems: "center",
  },
  appListContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  appItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  appName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  appPrice: {
    fontSize: 14,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  suggestionItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;