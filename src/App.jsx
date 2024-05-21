import "./App.css";
import ImageDiscovery from "./components/ImageDiscovery";
import MultiStepForm from "./components/MultiStepForm";
import Navbar from "./components/Navbar";
import UserInfoForm from "./components/UserInfoForm";

export default function App() {
  const componentList = [<UserInfoForm />, <ImageDiscovery />, <Example3 />];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900">
      <Navbar />
      <div className="w-full p-4 flex-grow flex justify-center">
        <MultiStepForm componentList={componentList} />
      </div>
    </div>
  );
}

const Example1 = () => {
  return <h1 className="text-white">step 1</h1>;
};
const Example2 = () => {
  return <h1 className="text-white">step 2</h1>;
};
const Example3 = () => {
  return <h1 className="text-white">step 3</h1>;
};
