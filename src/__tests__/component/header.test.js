import React from "react";
import { Provider } from "react-redux";
import { render, screen } from '@testing-library/react';
import configureStore from "redux-mock-store";
import Header from "../../component/Header";

const mockStore = configureStore([]);

describe("Header", () => {
  let store;

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

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
	});
	
	it("renders Header component", async () => {
    const items = await screen.findAllByText('Product')
    expect(items).toHaveLength(1)
    const item2 = await screen.findAllByText('Login')
    expect(item2).toHaveLength(1)
  });
});
