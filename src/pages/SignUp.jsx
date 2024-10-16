import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
const SignUp = () => {
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (auth) => {
      const { data } = await api.post(`/register`, auth);
      return data;
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Đăng ký tài khoản thành công",
      });

      nav("/login");
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
      <h3 className="font-bold mb-4">Đăng ký</h3>
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
          label="Tên người dùng"
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người dùng",
            },
          ]}
        >
          <Input />
        </Form.Item>
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
            Đăng ký
          </Button>
          <Link to="/login" className="ms-2">
            <Button htmlType="submit">Đăng nhập</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
