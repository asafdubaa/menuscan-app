import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Check,
  Download,
  Share as ShareIcon,
  Copy,
  Palette,
  Type,
  Image as ImageIcon,
  QrCode,
} from "lucide-react-native";
import { Image } from "expo-image";
import Header from "../components/Header";

export default function QRCustomizationScreen() {
  const router = useRouter();
  const [qrColor, setQrColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [includeRestaurantName, setIncludeRestaurantName] = useState(true);
  const [includeLogo, setIncludeLogo] = useState(true);
  const [copied, setCopied] = useState(false);

  const colorOptions = [
    "#000000",
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#EF4444",
    "#F59E0B",
  ];

  const handleBack = () => {
    router.back();
  };

  const handleFinish = () => {
    router.push("/generate-qr");
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    console.log("Share QR code");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="QR Code Customization"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
      />

      <ScrollView className="flex-1 px-5">
        <View className="py-6">
          <View className="items-center mb-8">
            <View
              className="p-6 rounded-xl shadow-sm items-center"
              style={{ backgroundColor }}
            >
              <Image
                source={{
                  uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://menudigitizer.app/m/lunch-specials&color=${qrColor.replace(
                    "#",
                    "",
                  )}&bgcolor=${backgroundColor.replace("#", "")}`,
                }}
                className="w-48 h-48 mb-4"
                contentFit="cover"
              />

              {includeRestaurantName && (
                <Text
                  className="text-lg font-medium"
                  style={{ color: qrColor }}
                >
                  Restaurant Name
                </Text>
              )}
            </View>
          </View>

          <View className="space-y-6 mb-8">
            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-800 font-medium mb-4">
                QR Code Color
              </Text>
              <View className="flex-row justify-between mb-2">
                {colorOptions.map((color) => (
                  <TouchableOpacity
                    key={color}
                    className={`w-10 h-10 rounded-full ${qrColor === color ? "border-2 border-blue-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onPress={() => setQrColor(color)}
                  />
                ))}
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-800 font-medium mb-4">
                Background Color
              </Text>
              <View className="flex-row justify-between mb-2">
                {[
                  "#FFFFFF",
                  "#F3F4F6",
                  "#FEF3C7",
                  "#DBEAFE",
                  "#D1FAE5",
                  "#EDE9FE",
                ].map((color) => (
                  <TouchableOpacity
                    key={color}
                    className={`w-10 h-10 rounded-full border ${backgroundColor === color ? "border-2 border-blue-500" : "border-gray-300"}`}
                    style={{ backgroundColor: color }}
                    onPress={() => setBackgroundColor(color)}
                  />
                ))}
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Type size={20} color="#4B5563" />
                  <Text className="text-gray-800 font-medium ml-2">
                    Include Restaurant Name
                  </Text>
                </View>
                <Switch
                  value={includeRestaurantName}
                  onValueChange={setIncludeRestaurantName}
                  trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
                  thumbColor={includeRestaurantName ? "#3B82F6" : "#9CA3AF"}
                />
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <ImageIcon size={20} color="#4B5563" />
                  <Text className="text-gray-800 font-medium ml-2">
                    Include Logo in QR
                  </Text>
                </View>
                <Switch
                  value={includeLogo}
                  onValueChange={setIncludeLogo}
                  trackColor={{ false: "#D1D5DB", true: "#BFDBFE" }}
                  thumbColor={includeLogo ? "#3B82F6" : "#9CA3AF"}
                />
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-2">Menu URL</Text>
              <View className="flex-row items-center justify-between bg-gray-50 p-3 rounded-md">
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

          <View className="space-y-3 mb-10">
            <TouchableOpacity
              className="bg-blue-500 py-3 px-6 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.8}
              onPress={handleFinish}
            >
              <QrCode size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">
                Generate Final QR Code
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-800 py-3 px-6 rounded-lg flex-row items-center justify-center"
              activeOpacity={0.8}
              onPress={handleShare}
            >
              <ShareIcon size={20} color="#FFFFFF" />
              <Text className="text-white font-medium ml-2">Share Preview</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
