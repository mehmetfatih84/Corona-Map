import { render, screen } from "@testing-library/react";
import DetailPage from ".";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; //ES6 modules
import { thunk } from "redux-thunk";
import { storeData } from "../../constants";

const mockStore = configureStore([thunk]);

it("yüklenme durumunda doğru bilşenler ekrana basılır", () => {
  const store = mockStore({
    isLoading: true,
    error: false,
    data: null,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  screen.getAllByTestId("card-loader");
  screen.getByTestId("header-loader");
});

it("hata durumunda doğru hata bilşeni ekrana basılır", () => {
  const store = mockStore({
    isLoading: false,
    error: "Cannot read properties of undefined (reading 'region')",
    data: null,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  screen.getByText(/Cannot read properties/i);
});

it("veri gelme durumunda doğru kartlar ekrana basılır", () => {
  const store = mockStore(storeData);

  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );

  const image = screen.getByRole("img");

  expect(image).toHaveProperty("src", "https://flagcdn.com/br.svg");

  const title = screen.getByTestId("title");

  expect(title).toHaveTextContent("Brazil");

  const covidData = Object.entries(storeData.data.covid);

  covidData.forEach((item) => {
    screen.getAllByText(item[0].split("_").join(" "), { exact: false });

    screen.getAllByText(item[1]);
  });
});
