import "./book.css";
import BookTable from "../components/Book/book.table";
import { useEffect, useState } from "react";
import { fetchAllBooksApi } from "../services/api.service";

const BooksPage = () => {
  const [dataBook, setDataBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadingData();
  }, [current, pageSize]);

  const loadingData = async () => {
    const res = await fetchAllBooksApi(current, pageSize);
    if (res.data) {
      setDataBook(res.data.result);
      setCurrent(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <div className="book-container">
      <BookTable
        current={current}
        setCurrent={setCurrent}
        pageSize={pageSize}
        total={total}
        dataBook={dataBook}
        setPageSize={setPageSize}
        loadingData={loadingData}
      />
    </div>
  );
};

export default BooksPage;
