import "./App.css";
import MuliStepForm from "./components/MuliStepForm";

export default function App() {
  const componentList = [<Example1 />, <Example2 />, <Example3 />];

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-zinc-700 gap-4">
      <h1 className="text-3xl font-bold text-lime-400">Image Finder</h1>
      <MuliStepForm componentList={componentList} />
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
