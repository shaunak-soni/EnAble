import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const Disclaimer = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Disclaimer</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to EnAble. This Disclaimer outlines the limitations and responsibilities 
          associated with using the EnAble platform. It covers the accuracy of information 
          sourced from public and third-party providers, the absence of guarantees or warranties, 
          and the user's responsibility to verify details before making decisions.
        </Text>

        <Text style={styles.sectionTitle}>2. Disclaimer Body</Text>
        <Text style={styles.text}>
          EnAble is a community-based platform intended to support individuals with disabilities 
          by providing access to housing, care facilities, and transportation resources. The 
          information presented within the app is collected from publicly available sources and 
          third-party providers. While we strive to ensure the accuracy and relevance of this data, 
          EnAble makes no representations or warranties regarding its completeness, reliability, 
          or suitability for any purpose.
          {'\n'}{'\n'}Users acknowledge and agree that EnAble shall not be held liable for any errors, 
          omissions, or inaccuracies in the data, nor for any decisions made based on such information. 
          All content is provided as is and is intended for informational purposes only.
          {'\n'}{'\n'}Users are encouraged to independently verify any information before making decisions based on it.
        </Text>

        <Text style={styles.sectionTitle}>3. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions or concerns about this policy, feel free to contact us at:{'\n'}
          <Text style={styles.email}>soni.shaun@gmail.com</Text>
        </Text>

        <Text style={styles.footer}>Last updated: July 29, 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9', // White background for full screen
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Also ensure scrollView has white background
  },
  contentContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'android' ? 100 : 40, // Enough space for Android navbar
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#345A7E',
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#567396',
    lineHeight: 22,
  },
  email: {
    fontWeight: 'bold',
    color: '#345A7E',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 14,
    color: '#7895B2',
  },
});

export default Disclaimer;
