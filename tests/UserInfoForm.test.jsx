import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import UserInfoForm from "../src/components/UserInfoForm";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { addUserInfo } from "../src/store/slices/userInfoSlice";

const mockStore = configureMockStore([]);
const mockOnNextStep = vi.fn();

const renderWithStore = (store) => {
  return render(
    <Provider store={store}>
      <UserInfoForm onNextStep={mockOnNextStep} />
    </Provider>
  );
};

describe("UserInfoForm", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        userData: {
          username: "",
          surname: "",
          topic: "",
          customTopic: "",
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    store.clearActions();
  });

  test("renders form element correctly", () => {
    renderWithStore(store);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Surname")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /Preferred Topic/i })
    ).toBeInTheDocument();
  });

  test("validates form inputs", async () => {
    renderWithStore(store);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    waitFor(() => {
      expect(screen.findByText("Name is required")).toBeInTheDocument();
      expect(screen.findByText("Surname is required")).toBeInTheDocument();
      expect(screen.findByText("Topic is required")).toBeInTheDocument();
    });
  });
  test("handles input changes and form submission", async () => {
    renderWithStore(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Surname"), {
      target: { value: "Test" },
    });
    fireEvent.change(
      screen.getByRole("combobox", { name: /Preferred Topic/i }),
      {
        target: { value: "Travel" },
      }
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const actions = store.getActions();
    expect(actions).toContainEqual(
      addUserInfo({
        username: "Test",
        surname: "Test",
        topic: "Travel",
        customTopic: "",
      })
    );
    expect(mockOnNextStep).toHaveBeenCalled();
  });

  test('displays custom topic input when "Other" is selected', () => {
    renderWithStore(store);

    fireEvent.change(
      screen.getByRole("combobox", { name: /Preferred Topic/i }),
      {
        target: { value: "Other" },
      }
    );

    expect(screen.getByPlaceholderText("Custom Topic")).toBeInTheDocument();
  });

  test('custom topic "Other" is selected and submitted', async () => {
    renderWithStore(store);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Surname"), {
      target: { value: "Test" },
    });

    fireEvent.change(
      screen.getByRole("combobox", { name: /Preferred Topic/i }),
      {
        target: { value: "Other" },
      }
    );

    expect(screen.getByPlaceholderText("Custom Topic")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Custom Topic"), {
      target: { value: "Custom" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const actions = store.getActions();
    expect(actions).toContainEqual(
      addUserInfo({
        username: "Test",
        surname: "Test",
        topic: "Other",
        customTopic: "Custom",
      })
    );
    expect(mockOnNextStep).toHaveBeenCalled();
  });
});
