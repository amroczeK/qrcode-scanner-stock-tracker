import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<unknown | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string>();

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

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
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
          facing={"back"}
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
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: "red",
  },
  button: {
    backgroundColor: "green",
    padding: 16,
  },
});
