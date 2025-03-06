import React from "react";
import { FlatList, Image } from "react-native";
import styles from "../Style/styles";

const DogGallery = ({ images }) => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      renderItem={({ item }) => <Image source={{ uri: item }} style={styles.imageSmall} />}
    />
  );
};

export default DogGallery;