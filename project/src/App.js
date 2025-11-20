
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css'

import {  BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Layout from "./Comps/Shared/Layout";
import All from "./Comps/All";
import Manage from "./Comps/Manage";
import ShoppingCart from "./Comps/ShoppingCart";
import Home from "./Comps/Home";
import Login from "./Comps/Login";
import Register from "./Comps/Register";
import Start from './Comps/Start';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
              <Route path="/start" element={<Start />} />
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="all" element={<All />}></Route>
             <Route path="manage" element={<Manage />}></Route>
             <Route path="sal" element={<ShoppingCart />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
