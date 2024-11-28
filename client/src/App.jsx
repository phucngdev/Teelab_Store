import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import PublicRouter from "./routes/user/PublicRouter";
import PrivateRouter from "./routes/admin/PrivateRouter";
import Home from "./pages/user/Home";
import NotFound from "./pages/user/NotFound";
import ListOfProduct from "./pages/user/ListOfProduct";
import Size from "./pages/user/Size";
import Service from "./pages/user/Service";
import Detail from "./pages/user/Detail";
import Cart from "./pages/user/Cart";
import Pay from "./pages/user/Pay";
import CheckOrder from "./pages/user/CheckOrder";
import CheckOrderDetail from "./pages/user/CheckOrderDetail";
import Login from "./pages/user/Login";
import Dashboard from "./pages/admin/Dashboard";
import NotFoundAdmin from "./pages/admin/NotFoundAdmin";
import Products from "./pages/admin/Products";
import CreateProduct from "./pages/admin/CreateProduct";
import Register from "./pages/user/Register";
import Orders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";
import PayCheck from "./pages/user/PayCheck";
import EditProduct from "./pages/admin/EditProduct";
import User from "./pages/admin/User";
import { useDispatch, useSelector } from "react-redux";
import Message from "./pages/user/Message";
import CategoryManagement from "./pages/admin/CategoryManagement";
import OrderHistory from "./pages/user/OrderHistory";
import Chat from "./pages/admin/Chat";
import ChatBox from "./pages/admin/ChatBox";
import IndexBoxChat from "./components/admin/chat/IndexBoxChat";
import ImportProduct from "./pages/admin/ImportProduct";
import { getAllCategory } from "./services/category.service";
import { getAllProduct } from "./services/product.service";
import Pending from "./components/user/animation/Pending";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const fetchData = async () => {
    await Promise.all([
      dispatch(getAllCategory()),
      dispatch(getAllProduct({ page: 0, limit: 0 })),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = useSelector((state) => state.category.data);

  if (!categories) return <Pending />;

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRouter />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="chi-tiet/:id" element={<Detail />} />
          <Route path="gio-hang" element={<Cart />} />
          <Route path="thanh-toan" element={<Pay />} />
          <Route path="trang-thai-thanh-toan" element={<PayCheck />} />
          <Route path="kiem-tra-don-hang" element={<CheckOrder />} />
          <Route path="kiem-tra-don-hang/:id" element={<CheckOrderDetail />} />
          <Route path="lich-su-mua-hang/:id" element={<OrderHistory />} />
          <Route path="bang-size" element={<Size />} />
          <Route path="chinh-sach-doi-tra" element={<Service />} />
          <Route path="cham-soc-khac-hang/:id" element={<Message />} />
          <Route
            path="tat-ca-san-pham"
            element={<ListOfProduct category={"Tất cả sản phẩm"} />}
          />
          {categories?.map((c) => (
            <Route
              key={c.category_id}
              path={c.path}
              element={<ListOfProduct category={c.category_name} />}
            />
          ))}
        </Route>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/admin/" element={<PrivateRouter />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="don-hang" element={<Orders />} />
          <Route path="don-hang/:id" element={<OrderDetail />} />
          <Route path="san-pham" element={<Products />} />
          <Route path="san-pham/:id" element={<Products />} />
          <Route path="tao-moi-san-pham" element={<CreateProduct />} />
          <Route path="nhap-hang/:id" element={<ImportProduct />} />
          <Route path="chinh-sua-san-pham/:id" element={<EditProduct />} />
          <Route path="quan-ly-danh-muc" element={<CategoryManagement />} />
          <Route path="tai-khoan" element={<User />} />
          <Route path="cham-soc-khach-hang" element={<Chat />}>
            <Route index element={<IndexBoxChat />} />
            <Route path=":id" element={<ChatBox />} />
          </Route>
          <Route path="*" element={<NotFoundAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
