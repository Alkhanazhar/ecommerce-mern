import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import Context from "./context/Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const countCartItems = () => {
    axios
      .get("/count-add-to-cart", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setCount(res.data.data);
      });
  };

  const fetchUserDetails = async () => {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get("/get-user", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      dispatch(setUserDetails(data.data));
      return;
    }
  };
  useEffect(() => {
    fetchUserDetails();
    countCartItems();
  }, []);
  return (
    <Context.Provider value={{ fetchUserDetails, countCartItems, count }}>
      <Header />
      <ToastContainer position="top-center" />
      <div className="md:min-h-[calc(100vh-140px)] tracking-wide mt-[4.2rem]">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </Context.Provider>
  );
};

export default App;
