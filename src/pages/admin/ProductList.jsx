import { Button, Image, message, Popconfirm, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./../../api/index";
const ProductList = () => {
  const queryClient = useQueryClient();
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <>
          <Image src={imageUrl} width={100} />
        </>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Danh mục",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Tình trạng",
      key: "available",
      dataIndex: "available",
      render: (_, record) => (
        <>
          {record.available ? (
            <Tag color="green">Còn hàng</Tag>
          ) : (
            <Tag color="red">Hết hàng</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/products/${record.id}`}>
            <Button type="primary">Chi tiết</Button>
          </Link>
          <Link to={`/admin/products/${record.id}/update`}>
            <Button>Sửa</Button>
          </Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => mutate(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get(`/products`);
      return data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      message.open({
        type: "success",
        content: "Xoá sản phẩm thành công",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.open({
        type: "error",
        content: "Có lỗi xảy ra, vui lòng thử lại",
      });
    },
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-bold">Danh sách sản phẩm</h3>
        <Link to="/admin/products/add">
          <Button type="primary">Thêm mới</Button>
        </Link>
      </div>
      <Skeleton active loading={isLoading}>
        <Table columns={columns} dataSource={data} />
      </Skeleton>
    </div>
  );
};

export default ProductList;
