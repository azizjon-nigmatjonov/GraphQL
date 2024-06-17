import Layouts from './components/Layouts'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './components/Form/'
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />} />
          <Route path="form/:status" element={<Form />} />
          <Route path="form/:status/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
