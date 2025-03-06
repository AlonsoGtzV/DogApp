import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../Style/styles";

const DogButton = ({ onPress, text, loading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      <Text style={styles.buttonText}>{loading ? "Cargando..." : text}</Text>
    </TouchableOpacity>
  );
};

export default DogButton;