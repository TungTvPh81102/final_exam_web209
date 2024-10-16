import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin";
import ProductList from "./pages/admin/ProductList";
import ProductAdd from "./pages/admin/ProductAdd";
import ProductEdit from "./pages/admin/ProductEdit";
import LayoutClient from "./layouts/LayoutClient";
import ProductDetail from "./pages/admin/ProductDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
        </Route>
        <Route path="/" element={<LayoutClient />}></Route>
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route
              index
              path="/admin/products"
              element={<ProductList />}
            ></Route>
            <Route
              index
              path="/admin/products/add"
              element={<ProductAdd />}
            ></Route>
            <Route
              index
              path="/admin/products/:id"
              element={<ProductDetail />}
            ></Route>
            <Route
              index
              path="/admin/products/:id/update"
              element={<ProductEdit />}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
