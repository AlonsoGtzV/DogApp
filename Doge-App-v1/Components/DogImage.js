import React from "react";
import { Image } from "react-native";
import styles from "../Style/styles";

const DogImage = ({ imageUrl }) => {
  return imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null;
};

export default DogImage;