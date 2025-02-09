import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Animated, Easing } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  const [upiID, setUpiID] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const handlePayment = () => {
    if (upiID.trim() === '') {
      Alert.alert('Error', 'Please enter a UPI ID');
      return;
    }
    Alert.alert('Payment Initiated', `Paying to ${upiID}`);
  };

  const generateQRCode = () => {
    const distanceBasedAmount = 100; // Placeholder amount based on distance
    setPaymentData(`upi://pay?pa=example@upi&am=${distanceBasedAmount}`);
    setShowQRCode(true);
    Alert.alert('QR Code Generated', `Ready to receive ₹${distanceBasedAmount}`);
    animateQRCode();
  };

  const animateQRCode = () => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Payments</Text>

        {/* RECEIVE PAYMENT Section */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>RECEIVE PAYMENT</Text>
          <TouchableOpacity style={styles.qrButton} onPress={generateQRCode}>
            <Icon name="qr-code" size={20} color="#fff" />
            <Text style={styles.qrButtonText}>GENERATE QR CODE</Text>
          </TouchableOpacity>
          {showQRCode && (
            <Animated.View style={[styles.qrContainer, { transform: [{ scale }] }]}>
              <QRCode value={paymentData} size={150} />
              <Text style={styles.qrText}>Scan to Pay</Text>
            </Animated.View>
          )}
        </View>

        {/* MAKE PAYMENT Section */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>MAKE PAYMENT</Text>
          <TextInput
            style={styles.input}
            placeholder="ENTER UPI ID"
            placeholderTextColor="#95a5a6"
            value={upiID}
            onChangeText={setUpiID}
          />
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Icon name="payment" size={20} color="#fff" />
            <Text style={styles.payButtonText}>PAY</Text>
          </TouchableOpacity>
        </View>

        {/* TRANSACTION HISTORY Section */}
        <View style={styles.section}>
          <Text style={styles.subHeading}>TRANSACTION HISTORY</Text>
          <ScrollView style={styles.historyContainer}>
            {/* Transaction history will be dynamically populated here */}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1a1a1a',
  },
  section: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subHeading: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 12,
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d8e0',
    borderRadius: 10,
    padding: 12,
    width: '90%',
    marginVertical: 10,
    backgroundColor: '#ecf0f1',
    fontSize: 16,
    color: '#2c3e50',
  },
  qrButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  qrText: {
    marginTop: 8,
    fontSize: 15,
    color: '#34495e',
  },
  payButton: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  historyContainer: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    width: '90%',
    maxHeight: 180,
    padding: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  transactionText: {
    fontSize: 15,
    marginVertical: 4,
    color: '#2d3436',
  },
});

export default PaymentScreen;