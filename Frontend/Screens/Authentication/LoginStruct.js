import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConfettiCannon from "react-native-confetti-cannon";
import styles from "./LoginStyle";

const LoginStruct = ({
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  errorMessage,
  showPassword,
  setShowPassword,
  loading,
  handleLogin,
  handleSignup,
  showConfetti,
}) => {
  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <LottieView 
          source={require('../../assets/bookmelogo.json')} 
          autoPlay 
          loop 
          style={styles.logo} 
        />
        <Text style={styles.appName}>BOOKME</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        {!isLogin && (
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignup}>
          <Text style={styles.buttonText}>{loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}</Text>
        </TouchableOpacity>

        <Text onPress={() => setIsLogin(!isLogin)} style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Text>
      </View>

      {showConfetti && <ConfettiCannon count={200} origin={{ x: 180, y: 0 }} fadeOut={true} />}
    </LinearGradient>
  );
};

export default LoginStruct;