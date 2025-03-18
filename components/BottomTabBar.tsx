import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Book, LogOut } from "lucide-react-native";

const BottomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/menus" && pathname === "/menus") return true;
    return false;
  };

  return (
    <View className="h-16 bg-white border-t border-gray-200 flex-row justify-around items-center px-2">
      <TouchableOpacity
        className="flex-1 items-center py-2"
        onPress={() => router.push("/")}
      >
        <Home
          size={24}
          color={isActive("/") ? "#3B82F6" : "#6B7280"}
          strokeWidth={isActive("/") ? 2.5 : 2}
        />
        <Text
          className={`text-xs mt-1 ${isActive("/") ? "text-blue-500 font-medium" : "text-gray-500"}`}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center py-2"
        onPress={() => router.push("/menus")}
      >
        <Book
          size={24}
          color={isActive("/menus") ? "#3B82F6" : "#6B7280"}
          strokeWidth={isActive("/menus") ? 2.5 : 2}
        />
        <Text
          className={`text-xs mt-1 ${isActive("/menus") ? "text-blue-500 font-medium" : "text-gray-500"}`}
        >
          My Menus
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center py-2"
        onPress={() => console.log("Logout pressed")}
      >
        <LogOut size={24} color="#6B7280" strokeWidth={2} />
        <Text className="text-xs mt-1 text-gray-500">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabBar;
