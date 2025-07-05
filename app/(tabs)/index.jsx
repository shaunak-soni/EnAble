import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.replace('Drawer');
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Show success alert
      Alert.alert('Success', 'Logged in successfully!');

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Logged in successfully!',
      });

      // Navigate to the home screen or dashboard
      navigation.navigate('Drawer');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This user account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'There is no user record corresponding to this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is incorrect.';
          break;
        default:
          errorMessage = 'An unknown error occurred. Please try again later.';
      }

      // Show error alert
      Alert.alert('Error', errorMessage);

      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused === 'email' ? '#007BFF' : '#ccc' }
        ]}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsFocused('email')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Password Input */}
      <TextInput
        style={[
          styles.input,
          { borderColor: isFocused === 'password' ? '#007BFF' : '#ccc' }
        ]}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setIsFocused('password')}
        onBlur={() => setIsFocused(null)}
      />

      {/* Login Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCE9FE',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100, // Adjust size to fit well on the screen
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#567396',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    padding: 35,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#567396',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#333',
    fontSize: 16,
  },
  registerLink: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
