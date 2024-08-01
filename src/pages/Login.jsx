import { Button, Form, Input, message, notification } from "antd";
import { LoginUserApi } from "../services/api.service";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
  const [form] = Form.useForm();

  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const res = await LoginUserApi(values.username, values.password);
    console.log(res);
    if (res.data) {
      message.success(`Welcome back ${values.username}`);
      localStorage.setItem("access_token", res.data.access_token);
      setUser(res.data.user);
      navigate("/");
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#ccc",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins",
      }}
    >
      <div
        style={{
          border: "3px solid #000",
          width: "800px",
          padding: "50px 100px",
          borderRadius: "16px",
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Login
        </h1>
        <span
          style={{
            fontSize: "14px",
            textAlign: "center",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Log in to your account!
        </span>
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              padding: "20px 30px",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            loading={loading}
          >
            Login
          </Button>
        </Form>
        <p style={{ marginTop: "20px" }}>
          {`Don't have an account?`}{" "}
          <NavLink style={{ fontSize: "18px" }} to="/register">
            Register now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
