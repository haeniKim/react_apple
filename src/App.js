import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Test from "./component/Test.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;