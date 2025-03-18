import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Search, Plus, Filter } from "lucide-react-native";
import { Image } from "expo-image";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";

interface Menu {
  id: string;
  name: string;
  lastEdited: string;
  itemCount: number;
  imageUrl?: string;
}

export default function MenusScreen() {
  const router = useRouter();

  const menus: Menu[] = [
    {
      id: "1",
      name: "Breakfast Menu",
      lastEdited: "2 days ago",
      itemCount: 12,
      imageUrl:
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
    },
    {
      id: "2",
      name: "Lunch Specials",
      lastEdited: "Yesterday",
      itemCount: 8,
      imageUrl:
        "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80",
    },
    {
      id: "3",
      name: "Dinner Menu",
      lastEdited: "1 week ago",
      itemCount: 15,
      imageUrl:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    },
    {
      id: "4",
      name: "Desserts",
      lastEdited: "3 days ago",
      itemCount: 6,
      imageUrl:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
    },
    {
      id: "5",
      name: "Drinks & Cocktails",
      lastEdited: "5 days ago",
      itemCount: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleMenuSelect = (menuId: string) => {
    router.push(`/edit-menu`);
  };

  const handleCreateMenu = () => {
    router.push("/create-menu");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="My Menus" />

      <View className="px-5 py-4">
        <View className="flex-row mb-4 space-x-2">
          <View className="flex-row items-center flex-1 bg-white px-4 rounded-lg border border-gray-200">
            <Search size={18} color="#9CA3AF" />
            <Text className="text-gray-400 ml-2 py-3">Search menus...</Text>
          </View>

          <TouchableOpacity className="w-10 h-10 bg-white rounded-lg items-center justify-center border border-gray-200">
            <Filter size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={menus}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            activeOpacity={0.7}
            onPress={() => handleMenuSelect(item.id)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-32"
              contentFit="cover"
            />

            <View className="p-4">
              <Text className="text-lg font-semibold text-gray-800">
                {item.name}
              </Text>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-gray-500 text-sm">
                  {item.itemCount} items
                </Text>
                <Text className="text-gray-500 text-sm">
                  Updated {item.lastEdited}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            className="bg-white rounded-xl border border-dashed border-gray-300 p-4 items-center justify-center h-24"
            activeOpacity={0.7}
            onPress={handleCreateMenu}
          >
            <Plus size={24} color="#6B7280" />
            <Text className="text-gray-600 font-medium mt-2">
              Create New Menu
            </Text>
          </TouchableOpacity>
        }
      />

      <BottomTabBar />
    </SafeAreaView>
  );
}
