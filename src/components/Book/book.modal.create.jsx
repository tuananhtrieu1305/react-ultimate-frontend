import { Modal, Input, Select, InputNumber, message, notification } from "antd";
import { useState } from "react";
import { createBookApi, handleUploadImg } from "../../services/api.service";

const ModalCreateBook = (props) => {
  const { isModalOpen, setIsModalOpen, loadingData } = props;
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleCancel = () => {
    setMainText("");
    setAuthor("");
    setCategory();
    setPrice(0);
    setQuantity(0);
    setThumbnail(null);
    setPreview(null);
    setIsModalOpen(false);
  };

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

  const handleClickSubmitBtn = async () => {
    const res = await handleUploadImg(selectedFile, "book");
    if (res && res.data) {
      const dataCreate = await createBookApi(
        res.data.fileUploaded,
        mainText,
        author,
        price,
        quantity,
        category
      );
      if (dataCreate && dataCreate.data) {
        message.success("Created success!");
        handleCancel();
        await loadingData();
      } else {
        notification.error({
          message: "Error",
          description: dataCreate.message,
        });
      }
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
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
              defaultValue={price}
              onChange={(value) => setPrice(value)}
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
              defaultValue={quantity}
              onChange={(value) => setQuantity(value)}
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
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="book-create-img"
            hidden
            onChange={onSelectFile}
            onClick={(e) => (e.target.value = null)}
          />
          <figure className="book-preview-thumbnail">
            {!preview ? <>NO IMAGE</> : <img src={preview} alt="Thumbnail" />}
          </figure>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateBook;
