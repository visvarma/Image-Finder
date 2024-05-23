import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { describe, beforeEach, afterEach, test, vi, expect } from "vitest";
import ImageDiscovery from "../src/components/ImageDiscovery";
import { fetchImages } from "../src/services/unsplashImageService.js";
import useFetch from "../src/hooks/useFetch";
import { addUserSelectedImage } from "../src/store/slices/userInfoSlice.js";
// import { addUserSelectedImage } from "../src/store/slices/userInfoSlice";

// Mocking dependencies
vi.mock("../src/services/unsplashImageService");
vi.mock("../src/hooks/useFetch");

const mockStore = configureMockStore([]);
const mockOnNextStep = vi.fn();

const renderWithStore = (store) => {
  return render(
    <Provider store={store}>
      <ImageDiscovery onNextStep={mockOnNextStep} />
    </Provider>
  );
};

describe("ImageDiscovery Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        userData: {
          topic: "Travel",
          customTopic: "",
        },
      },
    });

    useFetch.mockImplementation({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state correctly", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    renderWithStore(store);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("renders error state correctly", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: "Some error",
      refetch: vi.fn(),
    });

    renderWithStore(store);
    expect(screen.getByText(/Error: Some error/i)).toBeInTheDocument();
  });

  test("renders image correctly when fetched", () => {
    useFetch.mockReturnValueOnce({
      data: "https://example.com/image.jpg",
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithStore(store);
    expect(screen.getByAltText(/Travel image/i)).toBeInTheDocument();
  });

  test("renders message to fill the form in step 1 when no image is fetched", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithStore(store);
    expect(
      screen.getByText(/Please fill the form in step 1/i)
    ).toBeInTheDocument();
  });
});

describe("ImageDiscovery Component - User Interactions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        userData: {
          topic: "Travel",
          customTopic: "",
        },
      },
    });

    useFetch.mockReturnValue({
      data: "https://example.com/image.jpg",
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    store.clearActions();
  });

  test("dispatches addUserSelectedImage and calls onNextStep on accept", () => {
    renderWithStore(store);

    fireEvent.click(screen.getByText(/Accept/i));

    const actions = store.getActions();
    expect(actions).toContainEqual(
      addUserSelectedImage("https://example.com/image.jpg")
    );
    expect(mockOnNextStep).toHaveBeenCalled();
  });

  test("calls refetch on reject", () => {
    const refetchMock = vi.fn();
    useFetch.mockReturnValueOnce({
      data: "https://example.com/image.jpg",
      loading: false,
      error: null,
      refetch: refetchMock,
    });

    renderWithStore(store);

    fireEvent.click(screen.getByText(/Reject/i));

    expect(refetchMock).toHaveBeenCalled();
  });

  test("disables buttons when loading or error or no image", () => {
    useFetch.mockReturnValueOnce({
      data: null,
      loading: true,
      error: null,
      refetch: vi.fn(),
    });

    renderWithStore(store);

    expect(screen.getByText(/Accept/i)).toBeDisabled();
    expect(screen.getByText(/Reject/i)).toBeDisabled();
  });
});
