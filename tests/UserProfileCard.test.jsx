import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { beforeEach, describe, expect, test, vi } from "vitest";
import UserProfleCard from "../src/components/UserProfleCard";

const mockStore = configureMockStore([]);

const renderWithStore = (store) => {
  return render(
    <Provider store={store}>
      <UserProfleCard />
    </Provider>
  );
};

describe("UserProfileCard", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        userData: {
          selectedImage: "",
          username: "",
          surname: "",
        },
      },
    });
  });

  test("renders default message when no image is selected", () => {
    renderWithStore(store);

    expect(
      screen.getByText("Please select the image from Step 2")
    ).toBeInTheDocument();
  });

  test("renders selected image when available", () => {
    store = mockStore({
      user: {
        userData: {
          selectedImage: "https://example.com/image.jpg",
          username: "John",
          surname: "Doe",
          topic: "Nature",
        },
      },
    });

    renderWithStore(store);

    const img = screen.getByAltText("Nature image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  test("renders username and surname correctly", () => {
    store = mockStore({
      user: {
        userData: {
          selectedImage: "",
          username: "Tname",
          surname: "Sname",
        },
      },
    });

    renderWithStore(store);

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Tname")).toBeInTheDocument();
    expect(screen.getByText("Surname:")).toBeInTheDocument();
    expect(screen.getByText("Sname")).toBeInTheDocument();
  });

  test("renders placeholders when username and surname are not available", () => {
    renderWithStore(store);

    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.queryByText("Name: Tname")).not.toBeInTheDocument();
    expect(screen.getByText("Surname:")).toBeInTheDocument();
    expect(screen.queryByText("Surname: Sname")).not.toBeInTheDocument();
  });
});
