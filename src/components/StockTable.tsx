import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";
import StyledButton from "./StyledButton";
import { arrayToCsv, exportCsv } from "@/utilities";

type Props = {
  data: StockData[];
};

export type StockData = {
  key: number;
  stockNumber: string;
  description: string;
  heatNumber: string;
  weight: number;
  stockInOrOut: string;
};

const StockTable = ({ data = [] }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  const exportDataHandler = async () => {
    return alert("Not available yet.");
    try {
      // TODO: Fix this, doesn't work, deprecated SDK's
      const csvString: string = arrayToCsv(data);
      await exportCsv(csvString);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory table</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Stock #</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title>Heat #</DataTable.Title>
          <DataTable.Title>In/Out</DataTable.Title>
          <DataTable.Title numeric>Weight</DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.stockNumber}</DataTable.Cell>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell>{item.heatNumber}</DataTable.Cell>
            <DataTable.Cell>{item.stockInOrOut}</DataTable.Cell>
            <DataTable.Cell numeric>{item.weight}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
      <View style={styles.buttonContainer}>
        <StyledButton
          title={"Export Data"}
          onClickHandler={exportDataHandler}
        />
      </View>
    </View>
  );
};

export default StockTable;

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  buttonContainer: {
    alignItems: "center",
  },
});
