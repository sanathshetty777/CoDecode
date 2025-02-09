import React, { useEffect, useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, 
  Image, ActivityIndicator, ScrollView 
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://172.16.128.157:5001/api/profile"; // Updated backend URL

const Profile = () => {
  const [user, setUser] = useState({});
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setProfilePhoto(response.data.profilePhoto ? { uri: response.data.profilePhoto } : null);
      setAge(response.data.age || "");
      setPhone(response.data.phone || "");
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      Alert.alert("Error", "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const validateInputs = () => {
    if (!age || isNaN(age) || age <= 0) {
      Alert.alert('Invalid Age', 'Please enter a valid age.');
      return false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      await axios.put(`${API_URL}/update/${token}`, {
        age, phone, profilePhoto: profilePhoto?.uri, username: user.username, email: user.email
      });
      Alert.alert('Success', 'Profile updated successfully!');
      fetchUserProfile();
    } catch (error) {
      console.error('Update Error:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const token = await AsyncStorage.getItem("token");

              if (!token) {
                throw new Error("No token found");
              }

              await axios.delete(`${API_URL}/delete`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              Alert.alert("Deleted", "Account deleted successfully!");
            } catch (error) {
              console.error("Delete Error:", error);
              Alert.alert("Error", "Failed to delete account.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.error('ImagePicker Error:', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setProfilePhoto({ uri: response.assets[0].uri });
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}><Icon name="user" size={24} /> Profile</Text>

      <TouchableOpacity onPress={handleImagePicker} style={styles.profilePhotoContainer}>
        <Image
          source={profilePhoto ? profilePhoto : require('../assets/pp.jpg')}
          style={styles.profilePhoto}
        />
        <View style={styles.editIcon}>
          <Icon name="pencil" size={16} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={styles.field}>
        <Icon name="user-circle" size={20} color="#555" />
        <Text style={styles.text}>{user.username || 'Username'}</Text>
      </View>

      <View style={styles.field}>
        <Icon name="envelope" size={20} color="#555" />
        <Text style={styles.text}>{user.email || 'Email'}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="calendar" size={20} color="#555" />
        <TextInput style={styles.input} placeholder="Add Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#555" />
        <TextInput style={styles.input} placeholder="Add Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
        <Text style={styles.buttonText}><Icon name="trash" size={20} /> Delete Account</Text>
      </TouchableOpacity>

      <View style={styles.wallet}>
        <Icon name="credit-card" size={20} color="#555" />
        <Text style={styles.text}>Wallet Balance: ₹{user.wallet || 0}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => Alert.alert('Logged Out', 'You have been logged out.')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f8', flexGrow: 1, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#333', marginVertical: 20 },
  profilePhotoContainer: { position: 'relative', marginBottom: 20 },
  profilePhoto: { width: 130, height: 130, borderRadius: 65, borderWidth: 3, borderColor: '#4CAF50' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#4CAF50', borderRadius: 15, padding: 5 },
  field: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, width: '90%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, width: '90%' },
  input: { marginLeft: 10, flex: 1, fontSize: 16, color: '#333' },
  text: { fontSize: 16, marginLeft: 8, color: '#333' },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, width: '90%' },
  deleteButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, width: '90%' },
  logoutButton: { backgroundColor: '#555', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, width: '90%' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  wallet: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginTop: 20, width: '90%' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Profile;