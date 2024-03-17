import { BarcodeScanningResult, CameraView } from "expo-camera/next";
import { StyleSheet } from "react-native";

type Props = {
  isOpen: boolean;
  onQrCodeScan: ({ data }: BarcodeScanningResult) => void;
};

function Camera({ isOpen, onQrCodeScan }: Props) {
  return isOpen ? (
    <CameraView
      style={styles.camera}
      facing={"back"}
      onBarcodeScanned={onQrCodeScan}
    />
  ) : null;
}

export default Camera;

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
});
