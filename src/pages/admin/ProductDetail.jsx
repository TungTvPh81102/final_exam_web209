import { useQuery } from "@tanstack/react-query";
import { Button, Card, Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api";
import { useState } from "react";
import Meta from "antd/es/card/Meta";
const ProductDetail = () => {
  const { id } = useParams();
  const [selectProduct, setSelectProduct] = useState(null);
  const { isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      setSelectProduct(data);
      return data;
    },
  });

  if (isLoading) return <Spin />;
  return (
    <div>
      <h3 className="font-bold mb-4">
        Chi tiết sản phẩm: {selectProduct?.name}
      </h3>
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={<img alt="example" src={selectProduct?.imageUrl} />}
        className="mb-4"
      >
        <Meta title={selectProduct?.name}  />
        <p>Giá: {selectProduct?.price}</p>
        <p>Danh mục: {selectProduct?.category}</p>
        <p>Tình trạng: {selectProduct?.available ? "Còn hàng" : "Hết hàng"}</p>
        <p className="mb-4">
          Mô tả: {selectProduct?.description ?? "Đang cập nhật"}
        </p>
      </Card>
      <Link to="/admin/products">
        <Button type="primary">Quay lại trang danh sách</Button>
      </Link>
    </div>
  );
};

export default ProductDetail;
