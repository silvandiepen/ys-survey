import { useState } from "react";
import "./assets/style/App.scss";

import { createBemm } from "bemm";

import { Button } from "./components/UI/Button";

const bemm = createBemm("app");

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={bemm()}>
      <div className={bemm("card")}>
        <Button size="small" color="primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button size="medium" color="secondary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Button size="large" color="tertiary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </div>
  );
}

export default App;
