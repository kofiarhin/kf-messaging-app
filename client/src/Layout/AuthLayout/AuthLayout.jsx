import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const AuthLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AuthLayout;
