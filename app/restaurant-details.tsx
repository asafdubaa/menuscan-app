import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Phone,
  Upload,
  Image as ImageIcon,
} from "lucide-react-native";
import { Image } from "expo-image";
import Header from "../components/Header";

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push("/qr-customization");
  };

  const handleUploadLogo = () => {
    // Simulate uploading a logo
    setLogo("https://api.dicebear.com/7.x/initials/svg?seed=" + restaurantName);
  };

  const handleUploadBanner = () => {
    // Simulate uploading a banner
    setBanner(
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    );
  };

  const isFormValid = () => {
    return (
      restaurantName.trim() !== "" &&
      location.trim() !== "" &&
      phoneNumber.trim() !== ""
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="Restaurant Details"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
      />

      <ScrollView className="flex-1 px-5">
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Enter Your Restaurant Information
          </Text>
          <Text className="text-gray-500 mb-6">
            These details will be displayed on your digital menu
          </Text>

          <View className="space-y-5 mb-8">
            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-1">
                Restaurant Name
              </Text>
              <TextInput
                value={restaurantName}
                onChangeText={setRestaurantName}
                className="text-lg text-gray-800"
                placeholder="Enter restaurant name"
              />
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-1">Location</Text>
              <View className="flex-row items-center">
                <MapPin size={18} color="#9CA3AF" className="mr-2" />
                <TextInput
                  value={location}
                  onChangeText={setLocation}
                  className="text-lg text-gray-800 flex-1"
                  placeholder="Enter restaurant address"
                />
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-1">Phone Number</Text>
              <View className="flex-row items-center">
                <Phone size={18} color="#9CA3AF" className="mr-2" />
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  className="text-lg text-gray-800 flex-1"
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-3">
                Restaurant Logo
              </Text>
              {logo ? (
                <View className="items-center mb-3">
                  <Image
                    source={{ uri: logo }}
                    className="w-24 h-24 rounded-full mb-2"
                    contentFit="cover"
                  />
                  <TouchableOpacity onPress={handleUploadLogo}>
                    <Text className="text-blue-500">Change Logo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 items-center"
                  onPress={handleUploadLogo}
                >
                  <Upload size={24} color="#6B7280" />
                  <Text className="text-gray-600 mt-2">Upload Logo</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="bg-white rounded-xl shadow-sm p-4">
              <Text className="text-gray-500 text-sm mb-3">Banner Image</Text>
              {banner ? (
                <View className="mb-3">
                  <Image
                    source={{ uri: banner }}
                    className="w-full h-40 rounded-lg mb-2"
                    contentFit="cover"
                  />
                  <TouchableOpacity onPress={handleUploadBanner}>
                    <Text className="text-blue-500 text-center">
                      Change Banner
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 items-center h-40 justify-center"
                  onPress={handleUploadBanner}
                >
                  <ImageIcon size={24} color="#6B7280" />
                  <Text className="text-gray-600 mt-2">
                    Upload Banner Image
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <TouchableOpacity
            className={`bg-blue-500 py-4 px-6 rounded-lg flex-row items-center justify-center mb-10 ${!isFormValid() ? "opacity-50" : ""}`}
            activeOpacity={0.8}
            onPress={handleNext}
            disabled={!isFormValid()}
          >
            <Text className="text-white font-medium mr-2">Next</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
