import React, { useCallback, useEffect } from "react";
import { fetchImages } from "../services/unsplashImageService";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { addUserSelectedImage } from "../store/slices/userInfoSlice";

const ImageDiscovery = () => {
  const dispatch = useDispatch();
  const topic = useSelector((state) => state.user.userData.topic);

  const fetchImagesCallback = useCallback(() => fetchImages(topic), [topic]);

  const {
    data: imgSrc,
    loading,
    error,
    refetch,
  } = useFetch(fetchImagesCallback, topic);

  const handleImageSelect = (selection) => {
    if (selection === "reject") {
      refetch();
    } else {
      dispatch(addUserSelectedImage(imgSrc));
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="flex-grow max-h-full w-full overflow-hidden flex justify-center">
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {imgSrc && (
          <img
            src={imgSrc}
            className="object-contain"
            alt={`${topic} image`}
            loading="lazy"
          />
        )}
      </div>
      <div className="mt-8 flex justify-center gap-8">
        <button
          onClick={() => handleImageSelect("accept")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          disabled={loading || error}
        >
          Accept
        </button>
        <button
          onClick={() => handleImageSelect("reject")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          disabled={loading || error}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ImageDiscovery;