import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, initialized } = useAuth();
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if this is the first launch
    // For a real app, you would use AsyncStorage to persist this value
    setIsFirstLaunch(false);
  }, []);

  // Show loading while checking auth state
  if (!initialized || isFirstLaunch === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  // If it's the first launch, show onboarding
  if (isFirstLaunch) {
    return <Redirect href="/launch-screen" />;
  }

  // If logged in, go to home; otherwise, go to login
  if (user) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}
