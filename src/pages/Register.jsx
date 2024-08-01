import { Button, Form, Input, notification } from "antd";
import { registerUserApi } from "../services/api.service";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await registerUserApi(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.data) {
      notification.success({
        message: "Success",
        description: "You now have an account !",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Error",
        description: "Something wrong, try again !",
      });
    }
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
          Register
        </h1>
        <span
          style={{
            fontSize: "14px",
            textAlign: "center",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Join with us !
        </span>
        <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Full Name"
            name="fullName"
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
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!",
              },
            ]}
          >
            <Input />
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
          >
            Submit
          </Button>
        </Form>
        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <NavLink style={{ fontSize: "18px" }} to="/login">
            Login now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
