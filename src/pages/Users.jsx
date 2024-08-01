import UserForm from "../components/User/user.form";
import UserTable from "../components/User/user.table";
import { fetchAllUsersApi } from "../services/api.service";
import { useEffect, useState } from "react";
import "./users.css";

const UsersPage = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const loadingData = async () => {
    const res = await fetchAllUsersApi(current, pageSize);
    if (res.data) {
      setDataUsers(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <>
      <div
        className="user-side"
        style={{
          color: "#fff",
          marginTop: "100px",
          position: "fixed",
          inset: "0",
        }}
      >
        <UserForm loadingData={loadingData} />
        <UserTable
          dataUsers={dataUsers}
          loadingData={loadingData}
          current={current}
          pageSize={pageSize}
          total={total}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
};

export default UsersPage;
