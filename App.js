import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      try {
        if (!permission?.granted) {
          await requestPermission();
        }
      } catch (error) {
        setError(error);
      }
    };
    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(Math.random());
    setBarcode(data);
    setIsCameraVisible(false);
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.toString()}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraVisible && (
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={handleBarCodeScanned}
        />
      )}
      <View style={styles.barcodeContainer}>
        {barcode && <Text>{barcode}</Text>}
        <Button title="Scan" onPress={() => setIsCameraVisible(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  barcodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "1rem",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "red",
  },
  button: {
    backgroundColor: "green",
    padding: "1rem",
  },
});
