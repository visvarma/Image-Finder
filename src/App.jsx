import "./App.css";
import ImageDiscovery from "./components/ImageDiscovery";
import MultiStepForm from "./components/MultiStepForm";
import Navbar from "./components/Navbar";
import UserInfoForm from "./components/UserInfoForm";
import UserProfleCard from "./components/UserProfleCard";

export default function App() {
  const componentList = [
    <UserInfoForm />,
    <ImageDiscovery />,
    <UserProfleCard />,
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900">
      <Navbar />
      <div className="w-full p-4 flex-grow flex justify-center">
        <MultiStepForm componentList={componentList} />
      </div>
    </div>
  );
}
