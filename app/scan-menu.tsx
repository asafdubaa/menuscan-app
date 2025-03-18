import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  Image as ImageIcon,
  Check,
} from "lucide-react-native";
import Header from "../components/Header";

export default function ScanMenuScreen() {
  const router = useRouter();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleCapture = () => {
    // Simulate capturing an image
    setCapturedImage(
      "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?w=800&q=80",
    );
  };

  const handleConfirm = () => {
    // Navigate to processing screen with animation
    router.push("/processing");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Header
        title="Scan Menu"
        leftIcon={<ArrowLeft size={24} color="#F9FAFB" />}
        onLeftPress={handleBack}
        darkMode
      />

      <View className="flex-1 justify-center items-center px-5">
        {capturedImage ? (
          <View className="w-full items-center">
            <Image
              source={{ uri: capturedImage }}
              className="w-full aspect-[3/4] rounded-xl mb-6"
              resizeMode="cover"
            />

            <View className="flex-row space-x-4">
              <TouchableOpacity
                onPress={() => setCapturedImage(null)}
                className="bg-gray-800 py-3 px-6 rounded-full flex-row items-center"
              >
                <Camera size={20} color="#F9FAFB" />
                <Text className="text-white font-medium ml-2">Retake</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                className="bg-blue-500 py-3 px-6 rounded-full flex-row items-center"
              >
                <Check size={20} color="#F9FAFB" />
                <Text className="text-white font-medium ml-2">Use Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="w-full items-center">
            <View className="w-full aspect-[3/4] rounded-xl bg-gray-800 mb-6 items-center justify-center border border-gray-700">
              <ImageIcon size={48} color="#9CA3AF" />
              <Text className="text-gray-400 mt-4">Position menu in frame</Text>
            </View>

            <TouchableOpacity
              onPress={handleCapture}
              className="h-16 w-16 rounded-full bg-white items-center justify-center"
            >
              <View className="h-14 w-14 rounded-full border-2 border-gray-900" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
