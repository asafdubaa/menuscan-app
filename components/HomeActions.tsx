import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Plus, FolderOpen, Camera } from "lucide-react-native";

interface HomeActionsProps {
  onCreateMenu?: () => void;
  onOpenExisting?: () => void;
  onScanMenu?: () => void;
}

const HomeActions = ({
  onCreateMenu = () => console.log("Create new menu pressed"),
  onOpenExisting = () => console.log("Open existing menu pressed"),
  onScanMenu = () => console.log("Scan menu pressed"),
}: HomeActionsProps) => {
  const router = useRouter();

  return (
    <View className="w-full max-w-md">
      <Text className="text-xl font-semibold text-gray-800 mb-5">
        What would you like to do?
      </Text>

      <View className="space-y-4">
        <TouchableOpacity
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center"
          onPress={onCreateMenu}
          activeOpacity={0.7}
        >
          <View className="h-12 w-12 rounded-full bg-blue-50 items-center justify-center mr-4">
            <Plus size={24} color="#3B82F6" />
          </View>
          <View>
            <Text className="text-lg font-medium text-gray-800">
              Create New Menu
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Build a menu from scratch or photos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center"
          onPress={onOpenExisting}
          activeOpacity={0.7}
        >
          <View className="h-12 w-12 rounded-full bg-green-50 items-center justify-center mr-4">
            <FolderOpen size={24} color="#10B981" />
          </View>
          <View>
            <Text className="text-lg font-medium text-gray-800">My Menus</Text>
            <Text className="text-gray-500 text-sm mt-1">
              View and edit your existing menus
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex-row items-center"
          onPress={onScanMenu}
          activeOpacity={0.7}
        >
          <View className="h-12 w-12 rounded-full bg-purple-50 items-center justify-center mr-4">
            <Camera size={24} color="#8B5CF6" />
          </View>
          <View>
            <Text className="text-lg font-medium text-gray-800">Scan Menu</Text>
            <Text className="text-gray-500 text-sm mt-1">
              Create a digital menu from photos
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeActions;
