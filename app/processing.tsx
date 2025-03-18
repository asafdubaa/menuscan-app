import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  StatusBar,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { CheckCircle2 } from "lucide-react-native";

export default function ProcessingScreen() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Scanning menu with AI...");
  const [complete, setComplete] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Simulate processing steps
    const timer1 = setTimeout(() => {
      setProgress(20);
      setStatus("Extracting text from image...");
    }, 1500);

    const timer2 = setTimeout(() => {
      setProgress(40);
      setStatus("Refining with AI...");
    }, 3000);

    const timer3 = setTimeout(() => {
      setProgress(60);
      setStatus("Identifying menu items...");
    }, 4500);

    const timer4 = setTimeout(() => {
      setProgress(80);
      setStatus("Organizing content...");
    }, 6000);

    const timer5 = setTimeout(() => {
      setProgress(100);
      setStatus("Complete!");
      setComplete(true);

      // Animate success icon
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }, 7500);

    const timer6 = setTimeout(() => {
      router.replace("/edit-menu");
    }, 10000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 justify-center items-center px-6 py-4">
        {complete ? (
          <Animated.View
            className="items-center"
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            <CheckCircle2 size={80} color="#10B981" />
            <Text className="text-2xl font-bold text-gray-800 mt-6 mb-2 text-center">
              Menu Processed Successfully!
            </Text>
            <Text className="text-gray-500 text-center mb-4">
              Your menu is ready to be customized
            </Text>
          </Animated.View>
        ) : (
          <>
            {imageUri ? (
              <View className="w-72 h-72 mb-8 rounded-xl shadow-sm overflow-hidden bg-gray-100">
                <Image
                  source={{ uri: imageUri as string }}
                  className="w-full h-full"
                  contentFit="contain"
                  style={{
                    backgroundColor: '#f3f4f6',
                  }}
                />
              </View>
            ) : (
              <Image
                source={require("../assets/images/icon.png")}
                className="w-20 h-20 mb-8"
                contentFit="cover"
              />
            )}

            <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Processing Your Menu
            </Text>

            <Text className="text-gray-500 text-center mb-8">
              Our AI is analyzing your menu image and extracting all the details
            </Text>

            <View className="w-full max-w-sm bg-gray-100 h-3 rounded-full mb-3 overflow-hidden">
              <View
                className="bg-indigo-500 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>

            <Text className="text-gray-600 font-medium">{status}</Text>

            <ActivityIndicator size="large" color="#6366F1" className="mt-8" />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
