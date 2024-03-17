import { useEffect, useState } from "react";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/next";
import { StyleSheet, Text, View } from "react-native";
import Camera from "../components/Camera";
import { registerRootComponent } from "expo";
import ScanButton from "@/components/ScanButton";
import DataForm, { ScannedData } from "@/components/DataForm";

function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<unknown | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [data, setData] = useState<ScannedData>();

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

  const handleScannedQrCode = ({ data }: BarcodeScanningResult) => {
    const lines = data.split("\\n");
    const parsedData: ScannedData = {
      stockNumber: lines[0],
      description: lines[1],
      heatNumber: lines[2],
      weight: 0,
    };
    setData(parsedData);
    toggleCameraVisibility();
  };

  const toggleCameraVisibility = () =>
    setIsCameraVisible((prevState) => !prevState);

  const resetViews = () => {
    toggleCameraVisibility();
    setData(undefined);
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
      <Camera isOpen={isCameraVisible} onQrCodeScan={handleScannedQrCode} />
      {data && !isCameraVisible && (
        <DataForm data={data} onCancelHandler={resetViews} />
      )}
      {!data && !isCameraVisible && (
        <ScanButton onClickHandler={toggleCameraVisibility} />
      )}
    </View>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
