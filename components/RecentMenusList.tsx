import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ChevronRight, Clock, QrCode, Edit } from "lucide-react-native";
import { Image } from "expo-image";

interface MenuItem {
  id: string;
  name: string;
  lastEdited: string;
  itemCount: number;
  imageUrl?: string;
}

interface RecentMenusListProps {
  menus?: MenuItem[];
  onMenuSelect?: (menuId: string) => void;
  onViewAll?: () => void;
}

const RecentMenusList = ({
  menus = [
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
  ],
  onMenuSelect = (id) => console.log(`Menu selected: ${id}`),
  onViewAll = () => console.log("View all menus"),
}: RecentMenusListProps) => {
  return (
    <View className="w-full max-w-md">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-semibold text-gray-800">
          Recent Menus
        </Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text className="text-blue-600 font-medium">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        className="-mx-5 px-5"
      >
        {menus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            className="w-64 mr-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            onPress={() => onMenuSelect(menu.id)}
            activeOpacity={0.7}
          >
            {menu.imageUrl ? (
              <Image
                source={{ uri: menu.imageUrl }}
                className="w-full h-32"
                contentFit="cover"
              />
            ) : (
              <View className="w-full h-32 bg-gray-100 items-center justify-center">
                <QrCode size={32} color="#9ca3af" />
              </View>
            )}

            <View className="p-4">
              <Text className="font-semibold text-lg text-gray-800">
                {menu.name}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <View className="flex-row items-center">
                  <Clock size={14} color="#9ca3af" />
                  <Text className="text-gray-500 text-xs ml-1">
                    {menu.lastEdited}
                  </Text>
                </View>
                <Text className="text-gray-500 text-xs">
                  {menu.itemCount} items
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {menus.length === 0 && (
        <View className="items-center justify-center py-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <Text className="text-gray-400 text-center">
            No recent menus found
          </Text>
          <Text className="text-gray-400 text-center mt-1">
            Create a new menu to get started
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecentMenusList;
