import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../store/slices/userInfoSlice";

const UserInfoForm = ({ onNextStep }) => {
  const dispatch = useDispatch();
  const storeduserData = useSelector((state) => state.user.userData);

  const [userFormData, setUserFormData] = useState({
    username: "",
    surname: "",
    topic: "",
    customTopic: "",
  });
  const [errors, setErrors] = useState({});

  useState(() => {
    if (storeduserData) {
      console.log(storeduserData);
      setUserFormData({
        username: storeduserData.username || "",
        surname: storeduserData.surname || "",
        topic: storeduserData.topic || "",
        customTopic: storeduserData.customTopic || "",
      });
    }
  }, [storeduserData]);

  const handleFormInput = (formInputKey, formInputValue) => {
    setUserFormData({ ...userFormData, [formInputKey]: formInputValue });
    setErrors({ ...errors, [formInputKey]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!userFormData.username) newErrors.username = "Name is required";
    if (!userFormData.surname) newErrors.surname = "Surname is required";
    if (!userFormData.topic) newErrors.topic = "Topic is required";
    if (userFormData.topic === "Other" && !userFormData.customTopic)
      newErrors.customTopic = "Custom topic is required";
    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addUserInfo(userFormData));
      onNextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col self-center gap-6 p-6 bg-gray-900 text-white shadow-md rounded-lg w-full max-w-md mx-auto"
    >
      <label className="flex flex-col">
        <span className="mb-2 text-gray-400">Name:</span>
        <input
          type="text"
          name="username"
          value={userFormData.username}
          onChange={(e) => handleFormInput(e.target.name, e.target.value)}
          className="px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
        />
        {errors.username && (
          <span className="text-red-500 mt-2">{errors.username}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-gray-400">Surname:</span>
        <input
          type="text"
          name="surname"
          value={userFormData.surname}
          onChange={(e) => handleFormInput(e.target.name, e.target.value)}
          className="px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
        />
        {errors.surname && (
          <span className="text-red-500 mt-2">{errors.surname}</span>
        )}
      </label>

      <label className="flex flex-col">
        <span className="mb-2 text-gray-400">Preferred Topic:</span>
        <select
          name="topic"
          value={userFormData.topic}
          onChange={(e) => handleFormInput(e.target.name, e.target.value)}
          className="px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
        >
          <option value="">Select a topic</option>
          <option value="Travel">Travel</option>
          <option value="Cars">Cars</option>
          <option value="Wildlife">Wildlife</option>
          <option value="Technology">Technology</option>
          <option value="Other">Other</option>
        </select>
        {errors.topic && <span className="text-red-500">{errors.topic}</span>}
      </label>

      {userFormData.topic === "Other" && (
        <label className="flex flex-col">
          <span className="mb-2 text-gray-400">Custom Topic:</span>
          <input
            type="text"
            name="customTopic"
            value={userFormData.customTopic}
            onChange={(e) => handleFormInput(e.target.name, e.target.value)}
            className="px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-800 text-white"
          />
          {errors.customTopic && (
            <span className="text-red-500">{errors.customTopic}</span>
          )}
        </label>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default UserInfoForm;
