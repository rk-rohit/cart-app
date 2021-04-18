import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import App from '../../App';

const mockStore = configureStore([]);

describe("App", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      auth: {
        username: "rohit@gmail.com",
        password: "rohit123",
        isLoggedIn: false,
        errorMessage: "",
      },
      product: {
        product_list: []
      },
      cart: {
        cartItem: []
      }
    });
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("renders App component", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
