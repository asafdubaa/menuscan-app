import React, { useState } from "react";
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
import { ChevronLeft, Mail, Lock, Eye, EyeOff, User } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Registering with:", email);
      const { user, session } = await signUp(email, password);
      console.log("Registration success:", user ? "User created" : "No user");
      
      if (user) {
        Alert.alert(
          "Registration Successful", 
          "Please check your email to confirm your account.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/login")
            }
          ]
        );
      } else {
        // Direct login flow for auto-confirmed accounts
        router.replace("/home");
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      Alert.alert(
        "Registration Failed", 
        error.message || "Failed to register. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
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
            <Text className="text-3xl font-bold mb-2">Create Account</Text>
            <Text className="text-gray-600 mb-8">Sign up to get started</Text>

            {/* Hero Banner */}
            <LinearGradient
              colors={["#6366F1", "#8B5CF6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-6 mb-8 shadow-sm"
            >
              <Text className="text-white font-bold text-xl mb-2">
                Join MenuScan
              </Text>
              <Text className="text-white/80 mb-4">
                Create your own QR code menus in minutes
              </Text>
            </LinearGradient>

            {/* Registration Form */}
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
              <View className="flex-row items-center border border-gray-200 rounded-lg px-4 py-3 mb-4">
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

              {/* Confirm Password Field */}
              <View className="flex-row items-center border border-gray-200 rounded-lg px-4 py-3 mb-6">
                <Lock size={20} color="#6366F1" className="mr-2" />
                <TextInput
                  placeholder="Confirm Password"
                  className="flex-1 text-gray-800"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isSubmitting || loading}
              className={`rounded-lg py-4 items-center mb-4 ${
                isSubmitting || loading ? "bg-indigo-300" : "bg-indigo-500"
              }`}
            >
              {isSubmitting || loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-semibold text-base text-white">Create Account</Text>
              )}
            </TouchableOpacity>

            {/* Login Option */}
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text className="text-indigo-500 font-medium">Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 