import { Input, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { updateUserApi } from "../../services/api.service";

const UserModalUpdate = (props) => {
  const {
    loadingData,
    isModalOpen,
    setIsModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;

  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (dataUpdate) {
      setFullName(dataUpdate.fullName);
      setId(dataUpdate._id);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleClickSubmitBtn = async () => {
    const res = await updateUserApi(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Success",
        description: "Update a user",
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
    setId("");
    setPhone("");
    setIsModalOpen(false);
    setDataUpdate({});
  };

  return (
    <Modal
      title="Update User"
      open={isModalOpen}
      onOk={handleClickSubmitBtn}
      onCancel={() => {
        closeAndClearData();
      }}
      maskClosable={false}
      okText={"Update"}
      width={"1000px"}
    >
      <div className="user-form">
        <div className="user-input">
          <label>Id:</label>
          <Input value={id} disabled />
        </div>
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
          <label>Password:</label>
          <Input.Password value={"......"} disabled />
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
  );
};

export default UserModalUpdate;
