import Router from "../src/utilities/Router/Router"
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@material-ui/core";
import axios from "axios";
// axios.defaults.withCredentials = true;
function App() {
  return (
    <Box>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </Box>
  );
}

export default App;