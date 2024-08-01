import { Button, message, notification } from "antd";
import { Popconfirm, Table, Drawer } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import ModalCreateBook from "./book.modal.create";
import ModalEditBook from "./book.modal.edit";
import { deleteBookApi } from "../../services/api.service";

const BookTable = (props) => {
  const {
    dataBook,
    current,
    setCurrent,
    pageSize,
    total,
    setPageSize,
    loadingData,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpenDrawer = (data) => {
    setIsOpenDrawer(true);
    setDataDetail(data);
  };

  const confirm = async () => {
    const res = await deleteBookApi(dataDelete._id);
    if (res && res.data) {
      loadingData();
      message.success("Delete succeed!");
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
      render: (_, record, index) => (
        <a
          className="table-user-id"
          href="#"
          onClick={() => handleClickOpenDrawer(record)}
        >
          {record._id}
        </a>
      ),
    },
    {
      title: "Title",
      dataIndex: "mainText",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="table-action-btn-group">
          <EditOutlined
            style={{ color: "#99fb99" }}
            onClick={() => {
              setIsEditOpen(true);
              setDataEdit(record);
            }}
          />
          <Popconfirm
            title={`Delete ${dataDelete.mainText}`}
            description="Are you sure to delete this book?"
            onConfirm={confirm}
            okText="Yes"
            placement="left"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#ffa9a9" }}
              onClick={() => setDataDelete(record)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setIsLoading(true);
    // setCurrent, setPageSize
    //nếu thay đổi trang : current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current); //"5" => 5
      }
    }

    //nếu thay đổi tổng số phần tử : pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize); //"5" => 5
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="book-table">
      <div className="book-table-header">
        <p>Book List</p>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Upload Book
        </Button>
      </div>
      <Table
        rowKey={"_id"}
        className="book-table-body user-table"
        columns={columns}
        dataSource={dataBook}
        pagination={{
          current: current,
          pageSize: pageSize,
          total: total,
        }}
        onChange={onChange}
        loading={isLoading}
      />
      <ModalCreateBook
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        loadingData={loadingData}
      />
      <Drawer
        title={`Full information of ${dataDetail.mainText}`}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        className="user-table-drawer"
      >
        <figure className="book-thumbnail-drawer">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
              dataDetail.thumbnail
            }`}
            alt={`${dataDetail.thumbnail}'s thumbnail`}
          />
        </figure>
        <p>
          <strong>ID</strong> : {dataDetail._id}
        </p>
        <p style={{ lineHeight: 1.5 }}>
          <strong>NAME</strong> : {dataDetail.mainText}
        </p>
        <p>
          <strong>AUTHOR</strong> : {dataDetail.author}
        </p>
        <p>
          <strong>PRICE</strong> : {dataDetail.price}
        </p>
        <p>
          <strong>SOLD</strong> : {dataDetail.sold}
        </p>
        <p>
          <strong>QUANTITY</strong> : {dataDetail.quantity}
        </p>
        <p>
          <strong>CATEGORY</strong> : {dataDetail.category}
        </p>
        <p>
          <strong>CREATE AT</strong> : {dataDetail.createdAt}
        </p>
        <p>
          <strong>UPDATE AT</strong> : {dataDetail.updatedAt}
        </p>
      </Drawer>
      <ModalEditBook
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        dataEdit={dataEdit}
        loadingData={loadingData}
        setDataEdit={setDataEdit}
      />
    </div>
  );
};

export default BookTable;
