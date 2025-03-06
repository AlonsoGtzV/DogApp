import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf2e9",
    padding: 20,
    marginTop:'8%',
    height: '100%'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff6600",
  },
  pickerContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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

export default styles;
