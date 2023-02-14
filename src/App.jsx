import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import FileInput from "./components/FileInput";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <FileInput />
      </div>
    </div>
  );
}

export default App;
