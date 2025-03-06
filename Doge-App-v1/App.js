import React from "react";
import { SafeAreaView } from "react-native";
import DogFetcher from "./Components/DogFetcher.js";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DogFetcher />
    </SafeAreaView>
  );
};