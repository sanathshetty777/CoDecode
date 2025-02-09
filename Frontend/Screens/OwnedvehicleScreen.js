import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const OwnedvehicleScreen = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [wheelType, setWheelType] = useState('2-wheeler');
  const [mileage, setMileage] = useState('');

  const handleSubmit = () => {
    if (!vehicleName || !registrationNumber || !capacity || !mileage) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    Alert.alert('Success', `Vehicle Details Submitted Successfully!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}><Icon name="car" size={24} /> Owned Vehicle Information</Text>

      <View style={styles.inputContainer}>
        <Icon name="car" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Vehicle Name"
          value={vehicleName}
          onChangeText={setVehicleName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="id-card" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Registration Number"
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="users" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Maximum Capacity"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="circle" size={20} color="#555" />
        <Picker
          selectedValue={wheelType}
          style={styles.picker}
          onValueChange={(itemValue) => setWheelType(itemValue)}
        >
          <Picker.Item label="2-Wheeler" value="2-wheeler" />
          <Picker.Item label="3-Wheeler" value="3-wheeler" />
          <Picker.Item label="4-Wheeler" value="4-wheeler" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="tachometer" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Mileage (km/l)"
          value={mileage}
          onChangeText={setMileage}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f8', flexGrow: 1, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#333', marginVertical: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, width: '90%' },
  input: { marginLeft: 10, flex: 1, fontSize: 16, color: '#333' },
  picker: { flex: 1, marginLeft: 10, fontSize: 16 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, width: '90%' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default OwnedvehicleScreen;
