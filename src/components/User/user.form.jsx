import { Input, notification, Modal } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UserForm = (props) => {
  const { loadingData } = props;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickSubmitBtn = async () => {
    const res = await createUserApi(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Success",
        description: "Create new user",
      });
      closeAndClearData();
      await loadingData();
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(res.message),
      });
    }
  };
  const closeAndClearData = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="user-side-top">
        <span>Table Users</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="create-user-btn"
        >
          Create User
        </button>
      </div>

      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleClickSubmitBtn}
        onCancel={() => {
          closeAndClearData();
        }}
        maskClosable={false}
        okText={"Create"}
        width={"1000px"}
      >
        <div className="user-form">
          <div className="user-input">
            <label>Full Name:</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
          <div className="user-input">
            <label>Email:</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
          <div className="user-input">
            <label>Password:</label>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
          <div className="user-input">
            <label>Phone:</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;
