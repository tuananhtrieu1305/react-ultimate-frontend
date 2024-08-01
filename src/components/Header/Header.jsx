import "./header.css";
import Logo from "../../assets/react.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { LogoutUserApi } from "../../services/api.service";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    const res = await LogoutUserApi();
    if (res && res.data) {
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Logout success!");
      navigate("/");
    }
  };

  return (
    <ul className="header-ul">
      <li className="logo">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="" />
        </Link>
      </li>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/books">Books</NavLink>
      </li>
      {user && user.id ? (
        <>
          <li
            style={{ float: "right", marginRight: "20px" }}
            onClick={() => handleLogout()}
          >
            <a href="#">Log out</a>
          </li>
          <span
            style={{
              float: "right",
              color: "#fff",
              fontSize: "18px",
              padding: "14px 20px",
            }}
          >
            Welcome {user.fullName}
          </span>
        </>
      ) : (
        <li style={{ float: "right", marginRight: "20px" }}>
          <NavLink to="/login">Log in</NavLink>
        </li>
      )}
    </ul>
  );
};

export default Header;
