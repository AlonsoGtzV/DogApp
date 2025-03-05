import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from "react-native";

export default function App() {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomDog = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message); // URL de la imagen
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDog(); // Cargar una imagen al inicio
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐶 Imagen Random de Perros 🐶</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        dogImage && <Image source={{ uri: dogImage }} style={styles.image} />
      )}
      <Button title="Nueva imagen" onPress={fetchRandomDog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});
