import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

export default function LaunchScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#E9F0F7", "#F5F8FC"]}
        className="flex-1 px-6 justify-between"
        style={{ paddingTop: Platform.OS === 'ios' ? 12 : 0 }}
      >
        <View className="pt-6">
          <Text className="text-gray-400 text-lg font-medium">MenuScan</Text>
          <View className="pt-4">
            <Text className="text-4xl font-bold text-gray-900">
              Sign In to Create
            </Text>
            <Text className="text-4xl font-bold text-gray-900">
              your Digital Menu
            </Text>
          </View>
        </View>

        <View className="items-center justify-center flex-1">
          <Image
            source={require("../assets/images/icon.png")}
            className="w-64 h-64 rounded-3xl"
            contentFit="cover"
            style={{
              opacity: 0.9,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
            }}
          />
        </View>

        <View className="pb-10 px-4">
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-indigo-500 rounded-full py-4 items-center shadow-sm"
            style={{
              shadowColor: "#6366F1",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text className="font-semibold text-base text-white">Get started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
