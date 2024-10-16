import { message } from "antd";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    message.open({
      type: "error",
      content: "Bạn không có quyển truy cập",
    });
    return <Navigate to={"/login"} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouter;
