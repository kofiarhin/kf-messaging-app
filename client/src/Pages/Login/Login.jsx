import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../redux/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, user } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "kyrie@gmail.com",
    password: "password",
  });

  const { name, email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
      dispatch(reset());
    }
  }, [isSuccess, isLoading, user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name,
      email,
      password,
    };

    dispatch(loginUser(dataToSubmit));
  };
  return (
    <div className="container">
      <h1 className="heading center">Login</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
