import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Camera, Upload, Plus, FileText } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function CreateMenuScreen() {
  const router = useRouter();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const processImage = async (uri: string) => {
    setIsProcessing(true);
    try {
      // First, we'll enhance the image to make it more readable
      const enhancedImage = await ImageManipulator.manipulateAsync(
        uri,
        [
          { resize: { width: 1200 } }, // Resize to a reasonable width while maintaining aspect ratio
        ],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      setIsProcessing(false);
      return enhancedImage.uri;
    } catch (error) {
      console.error("Error processing image:", error);
      setIsProcessing(false);
      return uri; // Return original if processing fails
    }
  };

  const handleTakePhoto = async () => {
    if (!hasCameraPermission) {
      Alert.alert(
        "Camera Permission Required",
        "Please grant camera permission to take photos of your menu.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      // Show document scanning instructions
      Alert.alert(
        "Document Scanning Tips",
        "For best results:\n\n• Position the menu to fill the frame\n• Ensure good lighting\n• Hold the camera steady\n• Avoid shadows and glare",
        [{ text: "Got it!" }]
      );
      
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        // Process the image to enhance it for better text recognition
        const processedUri = await processImage(result.assets[0].uri);
        
        // Navigate to processing screen with the enhanced image
        router.push({
          pathname: "/processing",
          params: { imageUri: processedUri }
        });
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    }
  };

  const handleUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        // Process the image to enhance it for better text recognition
        const processedUri = await processImage(result.assets[0].uri);
        
        // Navigate to processing screen with the enhanced image
        router.push({
          pathname: "/processing",
          params: { imageUri: processedUri }
        });
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <View className="px-6 pt-2 pb-4 flex-row items-center">
        <TouchableOpacity 
          onPress={handleBack}
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4 shadow-sm"
        >
          <ArrowLeft size={20} color="#555" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Create Menu</Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          {/* Hero Banner */}
          <LinearGradient
            colors={["#6366F1", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-3xl p-6 mb-8 shadow-sm"
          >
            <Text className="text-white font-bold text-2xl mb-2">
              Create Your Digital Menu
            </Text>
            <Text className="text-white opacity-90 mb-2">
              Choose how you want to build your menu
            </Text>
          </LinearGradient>

          <Text className="text-lg font-bold text-gray-800 mb-6">
            Select a Method
          </Text>

          <View className="space-y-4 mb-8">
            <TouchableOpacity
              className="bg-gray-50 p-6 rounded-2xl shadow-sm flex-row items-center"
              activeOpacity={0.7}
              onPress={handleTakePhoto}
            >
              <View className="h-14 w-14 rounded-xl bg-indigo-100 items-center justify-center mr-4">
                <Camera size={24} color="#6366F1" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-medium text-gray-800 mb-1">
                  Take Photos
                </Text>
                <Text className="text-gray-500 text-sm">
                  Capture menu images with your camera and convert them to digital format
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-50 p-6 rounded-2xl shadow-sm flex-row items-center"
              activeOpacity={0.7}
              onPress={handleUploadImage}
            >
              <View className="h-14 w-14 rounded-xl bg-purple-100 items-center justify-center mr-4">
                <Upload size={24} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-medium text-gray-800 mb-1">
                  Upload Images
                </Text>
                <Text className="text-gray-500 text-sm">
                  Select existing menu photos from your gallery to digitize
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-50 p-6 rounded-2xl shadow-sm flex-row items-center"
              activeOpacity={0.7}
              onPress={() => router.push("/create-manual")}
            >
              <View className="h-14 w-14 rounded-xl bg-green-100 items-center justify-center mr-4">
                <Plus size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-medium text-gray-800 mb-1">
                  Create Manually
                </Text>
                <Text className="text-gray-500 text-sm">
                  Build your menu from scratch with our easy-to-use editor
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Tips Section */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Pro Tips
            </Text>
            
            <View className="bg-gray-50 rounded-2xl p-5">
              <View className="flex-row items-center mb-2">
                <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center mr-3">
                  <FileText size={20} color="#6366F1" />
                </View>
                <Text className="font-medium text-gray-800">
                  Menu Creation Best Practices
                </Text>
              </View>
              <Text className="text-gray-600 mb-3">
                For best results when scanning, ensure good lighting and a flat surface. For manual creation, organize items by categories.
              </Text>
              <TouchableOpacity>
                <Text className="text-indigo-500 font-medium">Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View className="px-6 pb-6 pt-2">
        <TouchableOpacity
          className="bg-indigo-500 py-4 rounded-full items-center shadow-sm"
          onPress={() => router.push("/create-manual")}
        >
          <Text className="text-white font-semibold text-base">
            Start Creating
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
