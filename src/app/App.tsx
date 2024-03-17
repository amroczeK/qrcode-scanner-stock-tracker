import { useEffect, useState } from "react";
import { BarcodeScanningResult, useCameraPermissions } from "expo-camera/next";
import { StyleSheet, Text, View } from "react-native";
import Camera from "../components/Camera";
import { registerRootComponent } from "expo";
import ScanButton from "@/components/ScanButton";
import DataForm, { ScannedData } from "@/components/DataForm";
import StockTable, { StockData } from "@/components/StockTable";
import { PaperProvider } from "react-native-paper";

function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<unknown | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<ScannedData>();
  const [tableData, setTableData] = useState<StockData[]>([]);

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
      stockInOrOut: "IN",
    };
    setScannedData(parsedData);
    toggleCameraVisibility();
  };

  const toggleCameraVisibility = () =>
    setIsCameraVisible((prevState) => !prevState);

  const resetViews = () => {
    setIsCameraVisible(false);
    setScannedData(undefined);
  };

  const onSubmitHandler = (data: Required<ScannedData>) => {
    const key = new Date().getTime();
    const savedData: Required<StockData> = {
      key,
      ...data,
    };
    setTableData((prevState) => [...prevState, savedData]);
    resetViews();
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
    <PaperProvider>
      <View style={styles.container}>
        <Camera
          isOpen={isCameraVisible}
          onQrCodeScan={handleScannedQrCode}
          onClose={resetViews}
        />
        {!scannedData && !isCameraVisible && <StockTable data={tableData} />}
        {scannedData && !isCameraVisible && (
          <DataForm
            data={scannedData}
            onCancelHandler={resetViews}
            onSubmitHandler={onSubmitHandler}
          />
        )}
        {!scannedData && !isCameraVisible && (
          <ScanButton onClickHandler={toggleCameraVisibility} />
        )}
      </View>
    </PaperProvider>
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
