import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Router } from "./router/router"

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
      <Router />
    </BrowserRouter>
  )
}

export default App
