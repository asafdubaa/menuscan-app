import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(["5", "1", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    router.push("/home");
  };

  const handleResendCode = () => {
    // Logic to resend code
    console.log("Resending code");
  };

  const handleChangeNumber = () => {
    router.back();
  };

  const handleCodeChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to next input if current input is filled
      if (text.length === 1 && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="px-4 py-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 rounded-full w-10 h-10 justify-center items-center"
          >
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeNumber}>
            <Text className="text-purple-500 font-medium">Change number</Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 pt-4">
          <Text className="text-2xl font-bold mb-2 text-center">
            Enter authentication code
          </Text>
          <Text className="text-gray-600 mb-8 text-center">
            Enter the 4-digit that we have sent via the phone number +62
            813-8172-5977
          </Text>

          <View className="flex-row justify-center space-x-4 mb-8">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-14 h-14 border border-gray-200 rounded-lg text-center text-xl"
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            className="bg-gray-200 rounded-full py-4 items-center mb-4"
          >
            <Text className="font-semibold text-base">Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResendCode} className="items-center">
            <Text className="text-purple-500">Resend code</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
