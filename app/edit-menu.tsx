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
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit2,
} from "lucide-react-native";
import Header from "../components/Header";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function EditMenuScreen() {
  const router = useRouter();
  const [menuTitle, setMenuTitle] = useState("Lunch Specials");

  const [categories, setCategories] = useState([
    "Appetizers",
    "Main Courses",
    "Desserts",
  ]);

  const [items, setItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce with our homemade dressing, croutons and parmesan",
      price: "8.99",
      category: "Appetizers",
    },
    {
      id: "2",
      name: "Garlic Bread",
      description: "Toasted ciabatta with garlic butter and herbs",
      price: "4.99",
      category: "Appetizers",
    },
    {
      id: "3",
      name: "Grilled Salmon",
      description:
        "Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables",
      price: "18.99",
      category: "Main Courses",
    },
    {
      id: "4",
      name: "Chocolate Cake",
      description: "Rich chocolate layer cake with ganache frosting",
      price: "6.99",
      category: "Desserts",
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    // Save menu and navigate to template selection
    router.push("/choose-template");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="Edit Menu"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
        rightIcon={<Text className="text-blue-500 font-medium">Next</Text>}
        onRightPress={handleSave}
      />

      <ScrollView className="flex-1 px-5">
        <View className="py-6">
          <View className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <Text className="text-gray-500 text-sm mb-1">Menu Title</Text>
            <TextInput
              value={menuTitle}
              onChangeText={setMenuTitle}
              className="text-xl font-semibold text-gray-800"
              placeholder="Enter menu title"
            />
          </View>

          {categories.map((category, index) => (
            <View key={index} className="mb-6">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold text-gray-800">
                  {category}
                </Text>
                <TouchableOpacity className="p-2">
                  <Edit2 size={18} color="#4B5563" />
                </TouchableOpacity>
              </View>

              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <View
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm p-4 mb-3 border border-gray-100"
                  >
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1 mr-3">
                        <Text className="text-lg font-medium text-gray-800">
                          {item.name}
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">
                          {item.description}
                        </Text>
                      </View>
                      <Text className="text-lg font-semibold text-gray-800">
                        ${item.price}
                      </Text>
                    </View>

                    <View className="flex-row mt-4 justify-end space-x-2">
                      <TouchableOpacity className="p-2">
                        <ImageIcon size={18} color="#4B5563" />
                      </TouchableOpacity>
                      <TouchableOpacity className="p-2">
                        <Edit2 size={18} color="#4B5563" />
                      </TouchableOpacity>
                      <TouchableOpacity className="p-2">
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              <TouchableOpacity
                className="flex-row items-center justify-center py-3 bg-gray-100 rounded-lg mt-2"
                activeOpacity={0.7}
              >
                <Plus size={18} color="#4B5563" />
                <Text className="text-gray-600 font-medium ml-2">Add Item</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            className="flex-row items-center justify-center py-4 bg-blue-50 rounded-lg mb-8"
            activeOpacity={0.7}
          >
            <Plus size={20} color="#3B82F6" />
            <Text className="text-blue-600 font-medium ml-2">
              Add New Category
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
