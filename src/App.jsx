import "./App.css";
import MultiStepForm from "./components/MultiStepForm";
import UserInfoForm from "./components/UserInfoForm";

export default function App() {
  const componentList = [<UserInfoForm />, <Example2 />, <Example3 />];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-lime-400 mb-8">IMAGE FINDER</h1>
      <MultiStepForm componentList={componentList} />
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
