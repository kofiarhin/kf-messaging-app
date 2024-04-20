import { Link } from "react-router-dom";
import "./header.styles.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../redux/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
  };
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">MGK</h1>
        </Link>

        <nav>
          {user ? (
            <>
              <Link to="/conversation"> Conversation</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
