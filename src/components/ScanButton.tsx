import React from "react";
import { Button, StyleSheet, View } from "react-native";

type Props = {
  onClickHandler: () => void;
};

function ScanButton({ onClickHandler }: Props) {
  return (
    <View style={styles.container}>
      <Button title="Scan QR Code" onPress={onClickHandler} />
    </View>
  );
}

export default ScanButton;

const styles = StyleSheet.create({
  container: {
    width: 180
  },
});
