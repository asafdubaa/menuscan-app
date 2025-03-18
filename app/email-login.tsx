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
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function EmailLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    router.push("/");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1">
          <View className="px-4 py-4 flex-row justify-between items-center">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 rounded-full w-10 h-10 justify-center items-center"
            >
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text className="font-semibold text-lg">Log in</Text>
            <View className="w-10" />
          </View>

          <View className="px-6 pt-4">
            <View className="mb-4">
              <Text className="text-sm text-gray-500 mb-1">Email</Text>
              <TextInput
                placeholder="juinal.william@gmail.com"
                className="border border-gray-200 rounded-lg px-4 py-3"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View className="mb-2">
              <Text className="text-sm text-gray-500 mb-1">password</Text>
              <TextInput
                placeholder="Enter your password"
                className="border border-gray-200 rounded-lg px-4 py-3"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
              <Text className="text-purple-500">Forgot password?</Text>
            </TouchableOpacity>

            <View className="mb-4">
              <Text className="text-xs text-gray-500 mb-4">
                By continuing, you agree to our{" "}
                <Text className="text-purple-500">Terms of Service</Text> and{" "}
                <Text className="text-purple-500">Privacy Policy</Text>.
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              className="bg-purple-500 rounded-full py-4 items-center mb-4"
            >
              <Text className="font-semibold text-base text-white">Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
