import { render, fireEvent } from "@testing-library/react-native";

import Waluty from "./screens/dodaj";

describe("Waluty form", () => {
  test("Powinna byc wyswietlana informacja i koniecznosci odpowiedzi na wszystkie pytabia", () => {
    const { getByTestId, getByText } = render(<Waluty />);
    const submitButton = getByTestId("submit-button");

    fireEvent.press(submitButton);

    expect(getByText("Wypełnij wszystkie pola formularza")).toBeTruthy();
  });

  test("Powinna byc wyswietlana informacja na temat nieprawidlowego formatu daty", () => {
    const { getByTestId, getByText } = render(<Waluty />);
    const dataWaznosciInput = getByTestId("dataWaznosci-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.changeText(dataWaznosciInput, "2023/06/30");
    fireEvent.press(submitButton);

    expect(getByText("Nieprawidłowy format daty")).toBeTruthy();
  });

  test("Powinna byc wyswietlana informacja o bledzie w przypadku kiedy data waznosci dokumentu jest starsza niz dzisiejsza", () => {
    const { getByTestId, getByText } = render(<Waluty />);
    const dataWaznosciInput = getByTestId("dataWaznosci-input");
    const submitButton = getByTestId("submit-button");

    // Ustaw datę ważności na przeszłą
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const expiredDate = currentDate.toISOString().slice(0, 10);

    fireEvent.changeText(dataWaznosciInput, expiredDate);
    fireEvent.press(submitButton);

    expect(
      getByText("Data ważności nie może być starsza niż dzisiejsza")
    ).toBeTruthy();
  });

  test("Powinna byc wyswietlana informacja  o bledzie w przypadku kiedy", () => {
    const { getByTestId, getByText } = render(<Waluty />);
    const dataWaznosciInput = getByTestId("dataWaznosci-input");
    const submitButton = getByTestId("submit-button");

    // Ustaw datę ważności na przekraczającą 10 lat
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(currentDate.getFullYear() + 11);
    const exceededDate = futureDate.toISOString().slice(0, 10);

    fireEvent.changeText(dataWaznosciInput, exceededDate);
    fireEvent.press(submitButton);

    expect(getByText("Data ważności nie może przekraczać 10 lat")).toBeTruthy();
  });
});
