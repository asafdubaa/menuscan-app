import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Download,
  Share as ShareIcon,
  Copy,
  Check,
} from "lucide-react-native";
import { Image } from "expo-image";
import Header from "../components/Header";

export default function GenerateQRScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: "Check out my digital menu!",
        url: "https://menudigitizer.app/m/lunch-specials",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="QR Code"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
      />

      <ScrollView className="flex-1 px-5">
        <View className="py-8 items-center">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Your Menu is Ready!
          </Text>

          <Text className="text-gray-500 text-center mb-8 px-6">
            Share this QR code with your customers to let them view your digital
            menu
          </Text>

          <View className="bg-white p-8 rounded-xl shadow-sm mb-8 items-center">
            <Image
              source={{
                uri: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://menudigitizer.app/m/lunch-specials",
              }}
              className="w-56 h-56 mb-4"
              contentFit="cover"
            />

            <Text className="text-lg font-medium text-gray-800">
              Lunch Specials
            </Text>
          </View>

          <View className="w-full max-w-sm space-y-4 mb-8">
            <TouchableOpacity
              className="bg-blue-500 py-3 px-6 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.8}
              onPress={handleShare}
            >
              <ShareIcon size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Share QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 py-3 px-6 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              <Download size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">
                Download QR Code
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full max-w-sm bg-gray-100 p-4 rounded-lg mb-8">
            <Text className="text-gray-500 text-sm mb-2">Menu URL</Text>
            <View className="flex-row items-center justify-between bg-white p-3 rounded-md">
              <Text className="text-gray-800 flex-1" numberOfLines={1}>
                https://menudigitizer.app/m/lunch-specials
              </Text>
              <TouchableOpacity onPress={handleCopy}>
                {copied ? (
                  <Check size={20} color="#10B981" />
                ) : (
                  <Copy size={20} color="#4B5563" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
