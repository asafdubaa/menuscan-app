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
import { ChevronLeft, Mail } from "lucide-react-native";
import { supabase } from "../utils/supabase";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Requesting password reset for:", email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      Alert.alert(
        "Email Sent", 
        "If an account exists with this email, you'll receive password reset instructions.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login")
          }
        ]
      );
    } catch (error: any) {
      console.error("Password reset error:", error.message);
      // For security reasons, we don't reveal whether the email exists or not
      Alert.alert(
        "Email Sent", 
        "If an account exists with this email, you'll receive password reset instructions."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
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
            <Text className="text-3xl font-bold mb-2">Reset Password</Text>
            <Text className="text-gray-600 mb-8">We'll send you a reset link</Text>

            {/* Hero Banner */}
            <LinearGradient
              colors={["#6366F1", "#8B5CF6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="rounded-2xl p-6 mb-8 shadow-sm"
            >
              <Text className="text-white font-bold text-xl mb-2">
                Forgot Your Password?
              </Text>
              <Text className="text-white/80 mb-4">
                Enter your email and we'll send you instructions to reset your password
              </Text>
            </LinearGradient>

            {/* Reset Form */}
            <View className="mb-8">
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
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isSubmitting}
              className={`rounded-lg py-4 items-center mb-8 ${
                isSubmitting ? "bg-indigo-300" : "bg-indigo-500"
              }`}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="font-semibold text-base text-white">Send Reset Link</Text>
              )}
            </TouchableOpacity>

            {/* Back to Login */}
            <View className="flex-row justify-center items-center">
              <Text className="text-gray-600">Remember your password? </Text>
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
