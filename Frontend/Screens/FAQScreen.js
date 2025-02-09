import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FAQScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How does the transport system work?",
      answer: "Our transport system uses real-time data and advanced algorithms to provide you with the most efficient routes and options.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, mobile wallets, and net banking.",
    },
    {
      question: "Is there an option for ride-sharing?",
      answer: "Yes, we offer ride-sharing options to help you save costs.",
    },
    {
      question: "How do I track my ride in real-time?",
      answer: "You can track your ride in real-time on the map with live updates.",
    },
    {
      question: "Can I cancel a ride after booking?",
      answer: "Yes, you can cancel, but cancellation fees may apply based on the timing.",
    },
    {
      question: "What should I do if I forget an item in the vehicle?",
      answer: "Contact our support immediately with your ride details.",
    },
  ];

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      </View>
      <ScrollView style={styles.container}>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.question}>
              <Text style={styles.questionText}>{faq.question}</Text>
              <Ionicons
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={22}
                color="#007AFF"
              />
            </TouchableOpacity>
            {expandedIndex === index && <Text style={styles.answer}>{faq.answer}</Text>}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    padding: 20,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  question: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    marginTop: 10,
    color: "#555",
  },
});

export default FAQScreen;
