import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import App from "../src/App";
import { Provider } from "react-redux";
import store from "../src/store";
import Navbar from "../src/components/Navbar";

describe("Navbar component", () => {
  it("renders the Navbar component", () => {
    render(<Navbar />);
  });

  it("Tests heading in Navbar", () => {
    render(<Navbar />);
    const heading = screen.getByText(/Image Finder/gi);
    expect(heading).toBeInTheDocument();
  });
});
