import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import BreedPicker from "./BreedPicker";
import DogButton from "./DogButton";
import DogImage from "./DogImage";
import DogGallery from "./DogGallery";
import styles from "../Style/styles";

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
      <BreedPicker breeds={breeds} selectedBreed={breed} setBreed={setBreed} />
      <DogButton onPress={fetchBreedImages} text="Buscar Raza" loading={loading} />
      <DogButton onPress={fetchRandomDogImage} text="Imagen Aleatoria" loading={loading} />
      {loading && <ActivityIndicator size="large" color="#ff6600" style={styles.loader} />}
      <DogImage imageUrl={dogImage} />
      <DogGallery images={breedImages} />
    </View>
  );
};

export default DogFetcher;