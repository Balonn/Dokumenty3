import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const Dodaj = () => {
  const [nazwaFirmy, setNazwaFirmy] = useState("");
  const [nazwaPliku, setNazwaPliku] = useState("");
  const [typPliku, setTypPliku] = useState("");
  const [file, setFile] = useState(null);
  const [dataWaznosci, setDataWaznosci] = useState("");
  const [formError, setFormError] = useState("");

  const handleNazwaFirmyChange = (text) => {
    setNazwaFirmy(text);
  };

  const handleNazwaPlikuChange = (text) => {
    setNazwaPliku(text);
  };

  const handleTypPlikuChange = (text) => {
    setTypPliku(text);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleDataWaznosciChange = (text) => {
    setDataWaznosci(text);
  };

  const handleSubmit = () => {
    if (!nazwaFirmy || !nazwaPliku || !typPliku || !file || !dataWaznosci) {
      setFormError("Wypełnij wszystkie pola formularza");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(dataWaznosci)) {
      setFormError("Nieprawidłowy format daty");
      return;
    }

    const currentDate = new Date();
    const expirationDate = new Date(dataWaznosci);
    const maxExpirationDate = new Date();
    maxExpirationDate.setFullYear(maxExpirationDate.getFullYear() + 10);

    if (expirationDate < currentDate) {
      setFormError("Data ważności nie może być starsza niż dzisiejsza");
      return;
    }

    if (expirationDate > maxExpirationDate) {
      setFormError("Data ważności nie może przekraczać 10 lat");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Rozmiar pliku nie może przekraczać 5MB");
      return;
    }

    if (file.type !== "application/pdf") {
      setFormError("Plik musi być w formacie PDF");
      return;
    }

    const formData = new FormData();
    formData.append("nazwaFirmy", nazwaFirmy);
    formData.append("nazwaPliku", nazwaPliku);
    formData.append("typPliku", typPliku);
    formData.append("dataWaznosci", dataWaznosci);
    formData.append("file", file);

    fetch("http://localhost:3000/api/v1/items", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Nazwa Firmy"
        value={nazwaFirmy}
        onChangeText={handleNazwaFirmyChange}
      />
      <TextInput
        placeholder="Nazwa Pliku"
        value={nazwaPliku}
        onChangeText={handleNazwaPlikuChange}
      />
      <TextInput
        placeholder="Typ Pliku"
        value={typPliku}
        onChangeText={handleTypPlikuChange}
      />
      <TextInput
        placeholder="Data ważności YYYY-MM-DD"
        value={dataWaznosci}
        onChangeText={handleDataWaznosciChange}
      />
      <input type="file" onChange={handleFileChange} />
      {formError && <Text>{formError}</Text>}
      <Button title="Dodaj" onPress={handleSubmit} />
    </View>
  );
};

export default Dodaj;
