import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Logging in with:", email);
      const { user, session } = await signIn(email, password);
      console.log("Login success:", user ? "User found" : "No user");
      
      if (user) {
        router.replace("/home");
      } else {
        Alert.alert("Error", "Failed to login. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      Alert.alert(
        "Login Failed", 
        error.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = () => {
    router.push("/signup");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="px-4 py-4">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 rounded-full w-10 h-10 justify-center items-center bg-gray-100"
            >
              <ChevronLeft size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View className="px-6 pt-4">
            <Text className="text-3xl font-bold mb-2">Welcome back</Text>
            <Text className="text-gray-600 mb-8">Log in to your account</Text>

            {/* Hero Banner */}
            <LinearGradient
              colors={["#6366F1", "#8B5CF6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-6 mb-8 shadow-sm"
            >
              <Text className="text-white font-bold text-xl mb-2">
                Create Digital Menus
              </Text>
              <Text className="text-white/80 mb-4">
                Transform your physical menus into QR codes for modern dining experiences
              </Text>
            </LinearGradient>

            {/* Login Form */}
            <View className="mb-6">
              {/* Email Field */}
              <View className="flex-row items-center border border-gray-200 rounded-lg px-4 py-3 mb-4">
                <Mail size={20} color="#6366F1" className="mr-2" />
                <TextInput
                  placeholder="Email"
                  className="flex-1 text-gray-800"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Field */}
              <View className="flex-row items-center border border-gray-200 rounded-lg px-4 py-3 mb-2">
                <Lock size={20} color="#6366F1" className="mr-2" />
                <TextInput
                  placeholder="Password"
                  className="flex-1 text-gray-800"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
              
              {/* Forgot Password */}
              <TouchableOpacity 
                onPress={handleForgotPassword}
                className="self-end mb-6"
              >
                <Text className="text-indigo-500 text-sm">Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isSubmitting || loading}
              className={`rounded-lg py-4 items-center mb-4 ${
                isSubmitting || loading ? "bg-indigo-300" : "bg-indigo-500"
              }`}
            >
              {isSubmitting || loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-semibold text-base text-white">Log in</Text>
              )}
            </TouchableOpacity>

            {/* Register Option */}
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Don't have an account? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text className="text-indigo-500 font-medium">Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
