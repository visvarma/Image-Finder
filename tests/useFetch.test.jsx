// src/hooks/__tests__/useFetch.test.js
import { renderHook, act } from "@testing-library/react-hooks";
import useFetch from "../src/hooks/useFetch.js";
import { beforeEach, describe, expect, it } from "vitest";

describe("useFetch hook", () => {
  let fetchFunction;

  beforeEach(() => {
    fetchFunction = vi.fn();
  });

  it("should set loading to true initially and false after fetch", async () => {
    fetchFunction.mockResolvedValue("mockData");

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(fetchFunction, "testTopic")
    );

    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });

  it("should fetch data successfully", async () => {
    const mockData = "mockData";
    fetchFunction.mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(fetchFunction, "testTopic")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBe(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should handle fetch errors", async () => {
    const mockError = new Error("Fetch failed");
    fetchFunction.mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(fetchFunction, "testTopic")
    );

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });

  it("should not fetch data if selectedTopic is null", async () => {
    const { result } = renderHook(() => useFetch(fetchFunction, null));

    expect(fetchFunction).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });

  it("should refetch data when selectedTopic changes", async () => {
    fetchFunction.mockResolvedValue("mockData1");
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ fetchFunction, selectedTopic }) =>
        useFetch(fetchFunction, selectedTopic),
      {
        initialProps: { fetchFunction, selectedTopic: "topic1" },
      }
    );

    await waitForNextUpdate();

    expect(result.current.data).toBe("mockData1");

    fetchFunction.mockResolvedValue("mockData2");
    rerender({ fetchFunction, selectedTopic: "topic2" });

    await waitForNextUpdate();

    expect(result.current.data).toBe("mockData2");
  });
});
