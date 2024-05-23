import { render, screen } from "@testing-library/react";

import { describe, it } from "vitest";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "../src/store";

describe("App", () => {
  it("renders the App component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
