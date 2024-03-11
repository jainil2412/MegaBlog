import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  // import.meta.env.VITE_APPWRITE_URL === END POINT ID
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCorrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap  content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>TODO:{/* <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
