import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 px-6 justify-between py-10">
        <View className="items-center pt-10">
          <Text className="text-2xl font-bold text-gray-900">DigiMenuAi</Text>
          <View className="mt-10">
            <Image
              source={require("../assets/images/icon.png")}
              className="w-32 h-32"
              style={{
                borderRadius: 24,
                backgroundColor: "#9370DB",
              }}
            />
          </View>
        </View>

        <View className="items-center">
          <Text className="text-2xl font-bold text-center mb-2">
            Create your Digital Menu In
          </Text>
          <Text className="text-2xl font-bold text-center">Seconds</Text>

          <View className="flex-row mt-8 space-x-2">
            <View className="h-2 w-2 rounded-full bg-gray-300" />
            <View className="h-2 w-2 rounded-full bg-gray-300" />
            <View className="h-2 w-2 rounded-full bg-gray-300" />
            <View className="h-2 w-2 rounded-full bg-purple-500" />
          </View>
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            onPress={handleCreateAccount}
            className="bg-purple-500 rounded-full py-4 items-center"
          >
            <Text className="font-semibold text-base text-white">
              Create account
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-600">Have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text className="text-purple-500 font-medium">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
