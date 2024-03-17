import React from "react";
import { Button } from "react-native";

type Props = {
  onClickHandler: () => void;
};

function ScanButton({ onClickHandler }: Props) {
  return <Button title="Scan" onPress={onClickHandler} />;
}

export default ScanButton;
