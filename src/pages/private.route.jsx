import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (user && user.id) {
    return <>{props.children}</>;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
        zIndex: "100",
        position: "relative",
      }}
    >
      <Result
        status="403"
        title="403"
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        subTitle="Sorry, you need to login to access this page."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default PrivateRoute;
