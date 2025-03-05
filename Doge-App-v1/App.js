import React, { useState, useEffect } from "react";
import { View, Image, Text, ActivityIndicator, Alert, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DogFetcher = () => {
  const [dogImage, setDogImage] = useState(null);
  const [breedImages, setBreedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) throw new Error("No se pudo obtener la lista de razas");
        const data = await response.json();
        setBreeds(Object.keys(data.message));
      } catch (err) {
        Alert.alert("Error", "Ocurrió un error al obtener la lista de razas");
      }
    };
    fetchBreeds();
  }, []);

  const fetchRandomDogImage = async () => {
    setLoading(true);
    setDogImage(null);
    setBreedImages([]);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      if (!response.ok) throw new Error("No se pudo obtener la imagen");
      const data = await response.json();
      setDogImage(data.message);
    } catch (err) {
      Alert.alert("Error", "Ocurrió un error al obtener la imagen");
    } finally {
      setLoading(false);
    }
  };

  const fetchBreedImages = async () => {
    if (!breed.trim()) {
      Alert.alert("Error", "Por favor, selecciona una raza de perro");
      return;
    }
    setLoading(true);
    setDogImage(null);
    setBreedImages([]);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random/5`);
      if (!response.ok) throw new Error("No se encontraron imágenes para esa raza");
      const data = await response.json();
      setBreedImages(data.message);
    } catch (err) {
      Alert.alert("Error", "No se encontraron imágenes para esa raza");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generador de Perritos 🐶</Text>
      <Picker
        selectedValue={breed}
        style={styles.picker}
        onValueChange={(itemValue) => setBreed(itemValue)}
      >
        <Picker.Item label="Selecciona una raza" value="" />
        {breeds.map((b) => (
          <Picker.Item key={b} label={b} value={b} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={fetchBreedImages} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Buscar Raza"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={fetchRandomDogImage} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Imagen Aleatoria"}</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />}
      {dogImage && <Image source={{ uri: dogImage }} style={styles.image} />}
      <FlatList
        data={breedImages}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.imageSmall} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "80%",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
  },
  imageSmall: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 5,
  },
});

export default DogFetcher;