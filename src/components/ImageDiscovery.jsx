import React, { useCallback, useEffect } from "react";
import { fetchImages } from "../services/unsplashImageService";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { addUserSelectedImage } from "../store/slices/userInfoSlice";

const ImageDiscovery = ({ onNextStep }) => {
  const dispatch = useDispatch();
  const topic = useSelector((state) => state.user.userData.topic);
  const customTopic = useSelector((state) => state.user.userData.customTopic);

  const selectedTopic = topic === "Other" ? customTopic : topic;

  const fetchImagesCallback = useCallback(
    () => fetchImages(selectedTopic),
    [selectedTopic]
  );

  const {
    data: imgSrc,
    loading,
    error,
    refetch,
  } = useFetch(fetchImagesCallback, selectedTopic);

  const handleImageSelect = (selection) => {
    if (selection === "reject") {
      refetch();
    } else {
      dispatch(addUserSelectedImage(imgSrc));
      onNextStep();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="flex-grow max-h-full w-full overflow-hidden flex justify-center">
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : imgSrc ? (
          <img
            src={imgSrc}
            className="object-contain"
            alt={`${selectedTopic} image`}
            loading="lazy"
          />
        ) : (
          <p className="text-white">Please fill the form in step 1</p>
        )}
      </div>
      <div className="mt-8 flex justify-center gap-8">
        <button
          onClick={() => handleImageSelect("accept")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          disabled={loading || error || !imgSrc}
        >
          Accept
        </button>
        <button
          onClick={() => handleImageSelect("reject")}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          disabled={loading || error || !imgSrc}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ImageDiscovery;
