import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";
import styles from "../Style/styles";

const BreedPicker = ({ breeds, selectedBreed, setBreed }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker selectedValue={selectedBreed} style={styles.picker} onValueChange={setBreed}>
        <Picker.Item label="Selecciona una raza" value="" />
        {breeds.map((b) => (
          <Picker.Item key={b} label={b} value={b} />
        ))}
      </Picker>
    </View>
  );
};

export default BreedPicker;