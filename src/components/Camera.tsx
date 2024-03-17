import { BarcodeScanningResult, CameraView } from "expo-camera/next";
import { Button, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
  isOpen: boolean;
  onQrCodeScan: ({ data }: BarcodeScanningResult) => void;
  onClose: () => void;
};

function Camera({ isOpen, onQrCodeScan, onClose }: Props) {
  return isOpen ? (
    <CameraView
      style={styles.camera}
      facing={"back"}
      onBarcodeScanned={onQrCodeScan}
    >
      <View style={styles.container}>
        <FontAwesome.Button
          iconStyle={{ margin: 8 }}
          name="times-circle-o"
          onPress={onClose}
          size={32}
          color="white"
          backgroundColor="transparent"
        />
      </View>
    </CameraView>
  ) : null;
}

export default Camera;

const styles = StyleSheet.create({
  camera: {
    height: "100%",
    width: "100%",
  },
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  closeButton: {
    marginBottom: 16,
  },
});
