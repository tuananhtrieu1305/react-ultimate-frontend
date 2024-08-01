/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { GetAccountApi } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchAccountUser();
  }, []);

  const fetchAccountUser = async () => {
    const res = await GetAccountApi();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };

  return (
    <>
      {isAppLoading ? (
        <div style={{ height: "100vh", backgroundColor: "#fff" }}>
          <Spin
            size="large"
            style={{
              position: "relative",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
