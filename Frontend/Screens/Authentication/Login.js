import React, { useState, useRef } from "react";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import LoginStruct from "./LoginStruct";

const API = "http://172.16.128.157:5001/api/auth";

const Login = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  const validateInputs = () => {
    if (!email || !password || (!isLogin && !username)) {
      setErrorMessage("⚠️ Please fill in all fields!");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("⚠️ Please enter a valid email address!");
      return false;
    }

    if (!isLogin) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "⚠️ Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
        );
        return false;
      }
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${API}/login`, { email, password });
      const { token, user } = response.data;
      await AsyncStorage.setItem("token", token);

      if (user?.email && user?.username) {
        navigation.replace("Home", { email: user.email, username: user.username });
      } else {
        setErrorMessage("⚠️ User data is incomplete!");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      await axios.post(`${API}/signup`, { email, password, username });

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

      setEmail("");
      setPassword("");
      setUsername("");
      setIsLogin(true);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginStruct
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      errorMessage={errorMessage}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      showConfetti={showConfetti}
    />
  );
};

export default Login;