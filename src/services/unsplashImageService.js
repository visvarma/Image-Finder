import axios from "axios";

export const fetchImages = async (topic) => {
  console.log("called");
  try {
    const response = await axios.get(
      "https://api.unsplash.com/photos/random?",
      {
        params: { query: topic, orientation: "landscape" },
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    return response.data.urls.small;
  } catch (error) {
    throw new Error(error);
  }
};
