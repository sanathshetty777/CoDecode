import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapComponent = ({ searchLocation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  // Fetch the coordinates for the selected location
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (searchLocation) {
        try {
          const response = await fetch(
            `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${searchLocation.place_id}&key=AlzaSykXI5323GbOsqzjj57klyhYjptiX-nmkIw`
          );
          const data = await response.json();
          if (data.status === "OK") {
            const { lat, lng } = data.result.geometry.location;
            setCoordinates({ latitude: lat, longitude: lng });
          } else {
            setErrorMsg("Failed to fetch coordinates.");
          }
        } catch (error) {
          setErrorMsg("Error fetching coordinates.");
          console.error("Coordinate fetch error:", error);
        }
      }
    };

    fetchCoordinates();
  }, [searchLocation]);

  // If current location is available, display it
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission denied");
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg("Error fetching location.");
        console.error("Location fetch error:", error);
      }
    })();
  }, []);

  return (
    <View style={styles.mapContainer}>
      {location || coordinates ? (
        <MapView
          style={styles.map}
          region={{
            latitude: coordinates ? coordinates.latitude : location.coords.latitude,
            longitude: coordinates ? coordinates.longitude : location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {coordinates && (
            <Marker
              coordinate={coordinates}
              title={searchLocation ? searchLocation.description : "You are here"}
            />
          )}
        </MapView>
      ) : (
        <Text>{errorMsg || "Fetching location..."}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: { width: "100%", height: "100%" },
});

export default MapComponent;
