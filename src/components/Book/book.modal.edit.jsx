import { Modal, Input, Select, InputNumber, message, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadImg, updateBookApi } from "../../services/api.service";

const ModalEditBook = (props) => {
  const { isEditOpen, setIsEditOpen, loadingData, dataEdit, setDataEdit } =
    props;
  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (dataEdit && dataEdit._id) {
      setId(dataEdit._id);
      setMainText(dataEdit.mainText);
      setAuthor(dataEdit.author);
      setPrice(dataEdit.price);
      setQuantity(dataEdit.quantity);
      setCategory(dataEdit.category);
      setPreview(
        `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataEdit.thumbnail}`
      );
    }
  }, [dataEdit]);

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

  const handleCancel = () => {
    setId("");
    setMainText("");
    setAuthor("");
    setCategory();
    setPrice(0);
    setQuantity(0);
    setPreview(null);
    setIsEditOpen(false);
    setSelectedFile(null);
    setDataEdit({});
  };

  const handleClickSubmitBtn = async () => {
    if (!selectedFile && !preview) {
      notification.error({
        message: "Error update book",
        description: "Please upload image",
      });
      return;
    }
    let newThumbnail = "";
    if (!selectedFile && preview) {
      newThumbnail = dataEdit.thumbnail;
    } else {
      const res = await handleUploadImg(selectedFile, "book");
      if (res && res.data) {
        newThumbnail = res.data.fileUploaded;
      } else {
        notification.error({
          message: "Error upload file",
          description: JSON.stringify(res.message),
        });
        return;
      }
    }
    const dataUpdate = await updateBookApi(
      id ? id : dataEdit._id,
      newThumbnail,
      mainText ? mainText : dataEdit.mainText,
      author ? author : dataEdit.author,
      price ? price : dataEdit.price,
      quantity ? quantity : dataEdit.quantity,
      category ? category : dataEdit.category
    );
    if (dataUpdate && dataUpdate.data) {
      message.success("Edit success");
      handleCancel();
      await loadingData();
    } else {
      notification.error({
        message: "error",
        description: dataUpdate.message,
      });
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isEditOpen}
        onOk={handleClickSubmitBtn}
        onCancel={handleCancel}
        width={"1000px"}
      >
        <div className="user-form book-form">
          <div className="user-input">
            <label>Title:</label>
            <Input
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
          <div className="user-input">
            <label>Author:</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickSubmitBtn();
                }
              }}
            />
          </div>
          <div className="user-input">
            <label>Price:</label>
            <InputNumber
              min={1}
              onChange={(value) => setPrice(value)}
              value={price}
              addonAfter="đ"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                borderWidth: "3px",
              }}
              className="book-price-input"
            />
          </div>
          <div className="user-input">
            <label>Quantity:</label>
            <InputNumber
              min={1}
              onChange={(value) => setQuantity(value)}
              value={quantity}
              style={{
                width: "100%",
                padding: "10px 0",
                backgroundColor: "transparent",
                borderWidth: "3px",
              }}
            />
          </div>
        </div>
        <div className="user-input" style={{ gap: "10px" }}>
          <label>Category:</label>
          <Select
            placeholder="Choose a tag for your book"
            onChange={(value) => setCategory(value)}
            value={category}
            allowClear
            className="book-category-select"
            options={[
              { value: "Arts", label: "Arts" },
              { value: "Business", label: "Business" },
              { value: "Comics", label: "Comics" },
              { value: "Cooking", label: "Cooking" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "History", label: "History" },
              { value: "Music", label: "Music" },
              { value: "Sports", label: "Sports" },
              { value: "Teen", label: "Teen" },
              { value: "Travel", label: "Travel" },
            ]}
          ></Select>
        </div>
        <div className="book-upload-create-img">
          <label htmlFor="book-create-img" className="book-create-img">
            Update Thumbnail
          </label>
          <input
            type="file"
            id="book-create-img"
            hidden
            onChange={onSelectFile}
            onClick={(e) => (e.target.value = null)}
          />
          <figure className="book-preview-thumbnail">
            {preview && <img src={preview}></img>}
          </figure>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditBook;
