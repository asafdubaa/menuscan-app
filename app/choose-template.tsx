import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, ChevronRight } from "lucide-react-native";
import { Image } from "expo-image";
import Header from "../components/Header";

const { width } = Dimensions.get("window");
const TEMPLATE_WIDTH = width * 0.7;

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export default function ChooseTemplateScreen() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: "1",
      name: "Modern",
      imageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
      description: "Clean and minimalist design with focus on readability",
    },
    {
      id: "2",
      name: "Classic",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
      description: "Traditional menu layout with elegant typography",
    },
    {
      id: "3",
      name: "Vibrant",
      imageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
      description: "Colorful design with eye-catching elements",
    },
  ];

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push("/restaurant-details");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header
        title="Choose Template"
        leftIcon={<ArrowLeft size={24} color="#4B5563" />}
        onLeftPress={handleBack}
      />

      <ScrollView className="flex-1 px-5">
        <View className="py-6">
          <Text className="text-xl font-semibold text-gray-800 mb-2">
            Select a Template
          </Text>
          <Text className="text-gray-500 mb-6">
            Choose a design template for your digital menu
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            className="-mx-5 px-5 mb-8"
          >
            {templates.map((template) => (
              <TouchableOpacity
                key={template.id}
                className={`mr-4 rounded-xl overflow-hidden ${selectedTemplate === template.id ? "border-2 border-blue-500" : "border border-gray-200"}`}
                style={{ width: TEMPLATE_WIDTH }}
                activeOpacity={0.7}
                onPress={() => setSelectedTemplate(template.id)}
              >
                <Image
                  source={{ uri: template.imageUrl }}
                  className="w-full h-80"
                  contentFit="cover"
                />
                <View className="p-4 bg-white">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-semibold text-gray-800">
                      {template.name}
                    </Text>
                    {selectedTemplate === template.id && (
                      <Check size={20} color="#3B82F6" />
                    )}
                  </View>
                  <Text className="text-gray-500 text-sm mt-1">
                    {template.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            className={`bg-blue-500 py-4 px-6 rounded-lg flex-row items-center justify-center mb-10 ${!selectedTemplate ? "opacity-50" : ""}`}
            activeOpacity={0.8}
            onPress={handleNext}
            disabled={!selectedTemplate}
          >
            <Text className="text-white font-medium mr-2">Next</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
