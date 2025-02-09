import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    Alert.alert('Success', 'Your inquiry has been submitted successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}><Icon name="envelope" size={24} /> Contact Us</Text>

      <View style={styles.contactDetails}>
        <Text style={styles.detail}><Icon name="envelope" size={18} /> Email: support@bookmeapp.com</Text>
        <Text style={styles.detail}><Icon name="phone" size={18} /> Phone: +123 456 7890</Text>
        <Text style={styles.detail}><Icon name="map-marker" size={18} /> Address: 123 Main St, Bengaluru, India</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="info-circle" size={20} color="#555" />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="comment" size={20} color="#555" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Inquiry</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f8', flexGrow: 1, alignItems: 'center' },
  header: { fontSize: 26, fontWeight: 'bold', color: '#333', marginVertical: 20 },
  contactDetails: { marginBottom: 20, alignItems: 'flex-start', width: '90%' },
  detail: { fontSize: 16, color: '#555', marginVertical: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, width: '90%' },
  input: { marginLeft: 10, flex: 1, fontSize: 16, color: '#333' },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, width: '90%' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default ContactScreen;
