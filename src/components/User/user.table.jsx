import { Table, Drawer, message, Popconfirm, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import UserModalUpdate from "./user.modal.update";
import { useState } from "react";
import {
  deleteUserApi,
  handleUploadImg,
  updateUserAvatarApi,
} from "../../services/api.service";

const UserTable = (props) => {
  const { dataUsers, loadingData, current, pageSize, total, setCurrent } =
    props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dataDrawer, setDataDrawer] = useState({});
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const confirm = async () => {
    const res = await deleteUserApi(dataDeleteUser._id);
    if (res.data) {
      loadingData();
      message.success("Delete user succeed");
    } else {
      message.error(res.message);
    }
  };

  const columns = [
    {
      title: "NO",
      render: (_, record, index) => <>{index + 1 + (current - 1) * pageSize}</>,
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            setIsDrawerOpen(true);
            setDataDrawer(record);
          }}
          className="table-user-id"
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "NAME",
      dataIndex: "fullName",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "ROLE",
      dataIndex: "role",
    },
    {
      title: "ACTION",
      render: (_, record) => (
        <div className="table-action-btn-group">
          <EditOutlined
            style={{ color: "#99fb99" }}
            onClick={() => {
              setIsModalUpdateOpen(true);
              setDataUpdate(record);
            }}
          />
          <Popconfirm
            title={`Delete ${dataDeleteUser.fullName}`}
            description="Are you sure to delete this user?"
            onConfirm={confirm}
            okText="Yes"
            placement="left"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#ffa9a9" }}
              onClick={() => setDataDeleteUser(record)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleUpdateUserAvatar = async () => {
    const resUpload = await handleUploadImg(selectedFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded;
      const resUpdate = await updateUserAvatarApi(
        dataDrawer._id,
        dataDrawer.fullName,
        dataDrawer.phone,
        newAvatar
      );
      if (resUpdate.data) {
        setIsDrawerOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadingData();
        message.success("Updated!");
      } else {
        notification.error({
          message: "Error",
          description: "Something wrong!",
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: JSON.stringify(resUpload.message),
      });
    }
  };

  const onChangePagination = (page) => {
    if (page && page.current && +page.current !== +current) {
      setCurrent(page.current);
    }
  };

  return (
    <>
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={dataUsers}
        className="user-table"
        pagination={{
          current: current,
          total: total,
        }}
        onChange={onChangePagination}
      />
      <UserModalUpdate
        isModalOpen={isModalUpdateOpen}
        setIsModalOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadingData={loadingData}
      />
      <Drawer
        title={`Full information of ${dataDrawer.fullName}`}
        onClose={() => {
          setIsDrawerOpen(false);
          setPreview(null);
        }}
        open={isDrawerOpen}
        className="user-table-drawer"
      >
        <figure className="user-table-avatar">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
              dataDrawer.avatar
            }`}
            alt={`${dataDrawer.fullName}'s avatar`}
          />
        </figure>
        <p>
          <strong>ID</strong> : {dataDrawer._id}
        </p>
        <p>
          <strong>NAME</strong> : {dataDrawer.fullName}
        </p>
        <p>
          <strong>EMAIL</strong> : {dataDrawer.email}
        </p>
        <p>
          <strong>PHONE</strong> : {dataDrawer.phone}
        </p>
        <p>
          <strong>ROLE</strong> : {dataDrawer.role}
        </p>
        {!preview ? (
          <div className="avatar-upload">
            <label htmlFor="userAvatarUpload">
              <CloudUploadOutlined />
              Change avatar
            </label>
            <input
              type="file"
              id="userAvatarUpload"
              hidden
              onChange={onSelectFile}
            />
          </div>
        ) : (
          <div className="user-table-preview">
            <figure>
              <img src={preview} alt="" />
            </figure>
            <div className="button-wrap">
              <button onClick={() => setPreview(null)}>Discard</button>
              <button onClick={() => handleUpdateUserAvatar()}>Confirm</button>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default UserTable;
