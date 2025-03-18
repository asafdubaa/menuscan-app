import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Menu } from "lucide-react-native";
import { BlurView } from "expo-blur";

interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
  leftIcon?: ReactNode;
  onLeftPress?: () => void;
  rightIcon?: ReactNode;
  onRightPress?: () => void;
  darkMode?: boolean;
}

const Header = ({
  title = "Menu Digitizer",
  onMenuPress,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  darkMode = false,
}: HeaderProps) => {
  const bgColor = darkMode ? "bg-gray-900/90" : "bg-white/90";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const iconColor = darkMode ? "#F9FAFB" : "#4B5563";

  return (
    <View className="w-full h-16">
      <BlurView
        intensity={80}
        tint={darkMode ? "dark" : "light"}
        className={`absolute w-full h-full z-0`}
      />
      <View
        className={`w-full h-full flex-row items-center justify-between px-4 z-10`}
      >
        {leftIcon ? (
          <TouchableOpacity
            onPress={onLeftPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100/30 dark:bg-gray-800/30"
          >
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center">
            <View className="bg-primary-500 rounded-lg p-1 mr-2 shadow-sm">
              <Image
                source={require("../assets/images/icon.png")}
                className="w-7 h-7 rounded-md"
                contentFit="cover"
              />
            </View>
            <Text className={`text-lg font-bold ${textColor}`}>{title}</Text>
          </View>
        )}

        {leftIcon && (
          <Text
            className={`text-lg font-bold ${textColor} absolute left-0 right-0 text-center`}
          >
            {title}
          </Text>
        )}

        {rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100/30 dark:bg-gray-800/30"
          >
            {rightIcon}
          </TouchableOpacity>
        ) : onMenuPress ? (
          <TouchableOpacity
            onPress={onMenuPress}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100/30 dark:bg-gray-800/30"
          >
            <Menu size={22} color={iconColor} />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
      </View>
      <View className="absolute bottom-0 w-full h-[1px] bg-gray-200 dark:bg-gray-800 opacity-50" />
    </View>
  );
};

export default Header;
