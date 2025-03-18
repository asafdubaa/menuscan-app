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
  Edit2,
  ChevronRight,
} from "lucide-react-native";
import Header from "../components/Header";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function CreateManualScreen() {
  const router = useRouter();
  const [menuTitle, setMenuTitle] = useState("New Menu");

  const [categories, setCategories] = useState(["Category 1"]);
  const [items, setItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Item Name",
      description: "Item description",
      price: "0.00",
      category: "Category 1",
    },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push("/choose-template");
  };

  const addCategory = () => {
    const newCategory = `Category ${categories.length + 1}`;
    setCategories([...categories, newCategory]);
  };

  const addItem = (category: string) => {
    const newItem = {
      id: Date.now().toString(),
      name: "New Item",
      description: "Item description",
      price: "0.00",
      category,
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof MenuItem, value: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="Create Menu"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
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
                    <TextInput
                      value={item.name}
                      onChangeText={(value) =>
                        updateItem(item.id, "name", value)
                      }
                      className="text-lg font-medium text-gray-800 mb-1"
                      placeholder="Item name"
                    />

                    <TextInput
                      value={item.description}
                      onChangeText={(value) =>
                        updateItem(item.id, "description", value)
                      }
                      className="text-gray-500 text-sm mb-2"
                      placeholder="Item description"
                      multiline
                    />

                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-500 text-sm">Price:</Text>
                      <TextInput
                        value={item.price}
                        onChangeText={(value) =>
                          updateItem(item.id, "price", value)
                        }
                        className="text-lg font-semibold text-gray-800 text-right"
                        placeholder="0.00"
                        keyboardType="decimal-pad"
                      />
                    </View>

                    <View className="flex-row mt-4 justify-end">
                      <TouchableOpacity
                        className="p-2"
                        onPress={() => deleteItem(item.id)}
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              <TouchableOpacity
                className="flex-row items-center justify-center py-3 bg-gray-100 rounded-lg mt-2"
                activeOpacity={0.7}
                onPress={() => addItem(category)}
              >
                <Plus size={18} color="#4B5563" />
                <Text className="text-gray-600 font-medium ml-2">Add Item</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            className="flex-row items-center justify-center py-4 bg-blue-50 rounded-lg mb-8"
            activeOpacity={0.7}
            onPress={addCategory}
          >
            <Plus size={20} color="#3B82F6" />
            <Text className="text-blue-600 font-medium ml-2">
              Add New Category
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 py-4 px-6 rounded-lg flex-row items-center justify-center mb-10"
            activeOpacity={0.8}
            onPress={handleNext}
          >
            <Text className="text-white font-medium mr-2">Next</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
