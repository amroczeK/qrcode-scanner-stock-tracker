import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

async function requestStoragePermission(): Promise<boolean> {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  return status === "granted";
}

interface DataItem {
  [key: string]: number | string;
}

export function arrayToCsv(data: DataItem[]): string {
  if (data.length === 0) {
    // Return an empty string if there's no data
    return "";
  }

  // Extract headers
  const headers = Object.keys(data[0]);

  // Map each object in the array to a CSV row
  const csvRows = data.map((row) => {
    return headers
      .map((header) => {
        const value = row[header];
        // Handle values that contain commas or double-quotes by wrapping them in double-quotes and escaping inner double-quotes
        const stringValue =
          typeof value === "string" ? value : value.toString();
        const escaped =
          stringValue.includes(",") || stringValue.includes('"')
            ? `"${stringValue.replace(/"/g, '""')}"`
            : stringValue;
        return escaped;
      })
      .join(",");
  });

  // Add header row at the beginning
  csvRows.unshift(headers.join(","));

  // Join all rows with newline characters to form the CSV string
  return csvRows.join("\r\n");
}

export async function exportCsv(csvString: string): Promise<void> {
  try {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      throw new Error("Storage permission not granted");
    }

    const datetime = new Date().getTime();
    const fileName = `${FileSystem.cacheDirectory}exportedStockData-${datetime}.csv`;
    await FileSystem.writeAsStringAsync(fileName, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileName);
  } catch (error) {
    console.error("Error exporting CSV:", error);
    throw error; // Re-throw the error for further handling
  }
}
