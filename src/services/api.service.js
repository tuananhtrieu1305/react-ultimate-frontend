import axios from "./axios.customize";

export const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = { fullName, email, password, phone };
  return axios.post(URL_BACKEND, data);
};
export const createBookApi = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = { thumbnail, mainText, author, price, quantity, category };
  return axios.post(URL_BACKEND, data);
};

export const fetchAllUsersApi = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

export const updateUserApi = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = { _id, fullName, phone };
  return axios.put(URL_BACKEND, data);
};
export const updateUserAvatarApi = (_id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const data = { _id, fullName, phone, avatar };
  return axios.put(URL_BACKEND, data);
};

export const deleteUserApi = (_id) => {
  const URL_BACKEND = `/api/v1/user/${_id}`;
  return axios.delete(URL_BACKEND);
};

export const handleUploadImg = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);
  return axios.post(URL_BACKEND, bodyFormData, config);
};
export const registerUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = { fullName, email, password, phone };
  return axios.post(URL_BACKEND, data);
};
export const LoginUserApi = (username, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = { username, password, delay: 5000 };
  return axios.post(URL_BACKEND, data);
};
export const LogoutUserApi = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};
export const GetAccountApi = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
export const fetchAllBooksApi = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
export const updateBookApi = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = { _id, thumbnail, mainText, author, price, quantity, category };
  return axios.put(URL_BACKEND, data);
};
export const deleteBookApi = (_id) => {
  const URL_BACKEND = `/api/v1/book/${_id}`;
  return axios.delete(URL_BACKEND);
};
