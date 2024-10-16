import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
const ProductEdit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      return await api.put(`/products/${id}`, product);
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công",
      });

      nav("/admin/products");

      queryClient.invalidateQueries({ queryKey: ["products", id] });
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

  if (isLoading) return <Spin />;
  return (
    <div>
      <h3 className="font-bold mb-4">Cập nhật sản phẩm: {data?.name}</h3>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        disabled={isPending}
        initialValues={data}
      >
        <Form.Item
          label="Tên sản phẩm"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên sản phẩm",
            },
            {
              min: 3,
              message: "Tên sản phẩm tối thiểu 3 ký tự",
            },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>
        <Form.Item
          label="Giá"
          name={"price"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập giá",
            },
            {
              type: "number",
              min: 0,
              message: "Giá không được âm",
            },
          ]}
        >
          <InputNumber placeholder="Nhập giá" />
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name={"category"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục",
            },
          ]}
        >
          <Select>
            <Select.Option value="">Chọn</Select.Option>
            <Select.Option value="Danh mục 1">Danh mục 1</Select.Option>
            <Select.Option value="Danh mục 2">Danh mục 2</Select.Option>
            <Select.Option value="Danh mục 3">Danh mục 3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name={"imageUrl"}
          rules={[
            {
              required: true,
              message: "Vui lòng thêm hình ảnh",
            },
          ]}
        >
          <Input placeholder="Nhập hình ảnh" />
        </Form.Item>
        <Form.Item
          label="Tình trạng"
          name={"available"}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Cập nhật
          </Button>
          <Link to="/admin/products" className="ms-2">
            <Button>Quay lại trng danh sách</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;
