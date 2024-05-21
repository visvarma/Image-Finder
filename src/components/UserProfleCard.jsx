import React from "react";
import { useSelector } from "react-redux";

const UserProfleCard = () => {
  const userInfo = useSelector((state) => state.user.userData);
  const { selectedImage, username, surname } = userInfo;

  return (
    <div className="border-2 border-gray-600 p-4 rounded-lg self-center ">
      {selectedImage ? (
        <img src={selectedImage} />
      ) : (
        "Please select the image from Step 2"
      )}
      <div className="flex flex-col items-center mt-5">
        <p>
          Name: <span className="font-bold">{username && username}</span>
        </p>
        <p>
          Surname: <span className="font-bold">{surname && surname}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfleCard;
