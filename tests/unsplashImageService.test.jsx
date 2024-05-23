import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchImages } from "../src/services/unsplashImageService.js";

vi.mock("axios");

describe("fetchImages", () => {
  it("fetches images based on topic", async () => {
    const topic = "nature";
    const mockResponse = {
      data: {
        urls: {
          small: "https://example.com/image.jpg",
        },
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchImages(topic);

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.unsplash.com/photos/random?",
      {
        params: { query: topic, orientation: "landscape" },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    expect(result).toBe("https://example.com/image.jpg");
  });

  it("throws an error when the request fails", async () => {
    const topic = "nature";
    const errorMessage = "Network Error";

    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchImages(topic)).rejects.toThrow(errorMessage);
  });
});
