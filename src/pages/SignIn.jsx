import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
const SignIn = () => {
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (auth) => {
      const { data } = await api.post(`/login`, auth);
      return data;
    },
    onSuccess: (data) => {
      message.open({
        type: "success",
        content: "Đăng nhập thành công",
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      nav("/admin/products");
    },
    onError: () => {
      message.open({
        type: "error",
        content: "Có lỗi xảy ra, vui lòng thử lại",
      });
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };
  return (
    <div>
      <h3 className="font-bold mb-4">Đăng nhập</h3>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        disabled={isPending}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              message: "Mật khẩu phải lớn hơn 6 ký tự",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
          <Link to="/register" className="ms-2">
            <Button htmlType="submit">
              Dăng ký
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
