import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Scan, Menu, Bell } from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleCreateMenu = () => {
    router.push("/create-menu");
  };

  const handleOpenExisting = () => {
    router.push("/menus");
  };

  const handleScanMenu = () => {
    router.push("/scan-menu");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <View className="px-6 pt-2 pb-4 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-400 text-sm font-medium">Welcome back</Text>
          <Text className="font-bold text-xl text-gray-900">MenuScan</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center shadow-sm">
          <Bell size={20} color="#555" />
        </TouchableOpacity>
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
            <View className="flex-row justify-between items-center">
              <View className="flex-1 pr-4">
                <Text className="text-white font-bold text-2xl mb-2">
                  Create Digital Menus
                </Text>
                <Text className="text-white opacity-90 mb-4">
                  Transform your physical menus into interactive QR codes
                </Text>
                <TouchableOpacity 
                  onPress={handleCreateMenu}
                  className="bg-white/20 self-start py-2 px-4 rounded-full"
                >
                  <Text className="text-white font-medium">Get Started</Text>
                </TouchableOpacity>
              </View>
              <View className="bg-white/20 p-3 rounded-2xl">
                <Menu size={40} color="#fff" />
              </View>
            </View>
          </LinearGradient>

          {/* Quick Actions */}
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Quick Actions
          </Text>
          
          <View className="flex-row justify-between mb-8">
            <TouchableOpacity 
              onPress={handleCreateMenu}
              className="bg-gray-50 rounded-2xl p-4 shadow-sm flex-1 mr-3 items-center"
            >
              <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mb-2">
                <Plus size={24} color="#6366F1" />
              </View>
              <Text className="text-center font-medium text-gray-800">Create Menu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleScanMenu}
              className="bg-gray-50 rounded-2xl p-4 shadow-sm flex-1 ml-3 items-center"
            >
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mb-2">
                <Scan size={24} color="#8B5CF6" />
              </View>
              <Text className="text-center font-medium text-gray-800">Scan Menu</Text>
            </TouchableOpacity>
          </View>
          
          {/* Recent Menus */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-800">
                Recent Menus
              </Text>
              <TouchableOpacity onPress={handleOpenExisting}>
                <Text className="text-indigo-500 font-medium">View All</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              onPress={handleOpenExisting}
              className="bg-gray-50 rounded-2xl p-4 mb-3 flex-row items-center"
            >
              <View className="w-14 h-14 bg-indigo-100 rounded-xl items-center justify-center mr-4">
                <Menu size={24} color="#6366F1" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 mb-1">Breakfast Menu</Text>
                <Text className="text-gray-500 text-sm">Created 2 days ago</Text>
              </View>
              <Text className="text-indigo-500">Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleOpenExisting}
              className="bg-gray-50 rounded-2xl p-4 flex-row items-center"
            >
              <View className="w-14 h-14 bg-purple-100 rounded-xl items-center justify-center mr-4">
                <Menu size={24} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 mb-1">Dinner Menu</Text>
                <Text className="text-gray-500 text-sm">Created 5 days ago</Text>
              </View>
              <Text className="text-indigo-500">Edit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Tips Section */}
          <View className="mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Tips & Tricks
            </Text>
            
            <View className="bg-gray-50 rounded-2xl p-5">
              <Text className="font-medium text-gray-800 mb-2">
                Optimize Your Menu
              </Text>
              <Text className="text-gray-600 mb-3">
                Use high-quality images and clear descriptions to make your digital menu stand out.
              </Text>
              <TouchableOpacity>
                <Text className="text-indigo-500 font-medium">Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-100 px-2">
        <TouchableOpacity className="items-center">
          <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mb-1 shadow-sm">
            <Menu size={20} color="#6366F1" />
          </View>
          <Text className="text-xs text-indigo-500 font-medium">Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleOpenExisting}
          className="items-center"
        >
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1 shadow-sm">
            <Menu size={20} color="#9CA3AF" />
          </View>
          <Text className="text-xs text-gray-500">My Menus</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleCreateMenu}
          className="items-center"
        >
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1 shadow-sm">
            <Plus size={20} color="#9CA3AF" />
          </View>
          <Text className="text-xs text-gray-500">Create</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleScanMenu}
          className="items-center"
        >
          <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1 shadow-sm">
            <Scan size={20} color="#9CA3AF" />
          </View>
          <Text className="text-xs text-gray-500">Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 