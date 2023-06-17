import React, { useEffect, useState } from "react";
import { DataTable, IconButton } from "react-native-paper";
import { View, StyleSheet, FlatList, Text } from "react-native";
import axios from "axios";

export default function listaDokumentow() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/items");
        const responseJson = await response.json();
        setItems(responseJson.items);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleDownload = async (id) => {
    try {
      console.log(id);
      const response = await axios.get(
        `http://localhost:3000/api/v1/items/download/${id}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: response.data.type });
      const url = URL.createObjectURL(blob);

      // Tworzenie linku do pobrania pliku
      const link = document.createElement("a");
      link.href = url;
      link.download = "file.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dostępne dokumenty</Text>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nazwa</DataTable.Title>
          <DataTable.Title>Typ Pliku</DataTable.Title>
          <DataTable.Title>Data waznosci</DataTable.Title>
          <DataTable.Title>Pobierz</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.nazwaFirmy}</DataTable.Cell>
              <DataTable.Cell>{item.typPliku}</DataTable.Cell>
              <DataTable.Cell>
                {item.dataWaznosci &&
                  new Date(item.dataWaznosci).toLocaleDateString()}
              </DataTable.Cell>

              <DataTable.Cell>
                <IconButton
                  icon="download"
                  size={20}
                  onPress={() => handleDownload(item._id)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          )}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gill Sans Extrabold, Helvetica, sans-serif",
  },
  header: {
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});
