import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { getOneProduct } from "../../services/product.service";
import { Carousel, message } from "antd";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";
import { addToCart, getCart } from "../../services/cart.service";
import { Helmet } from "react-helmet";
import LastView from "../../components/user/listofproduct/LastView";

const Detail = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.infoUser);

  const dispatch = useDispatch();

  const fetchData = async () => {
    await dispatch(getOneProduct(id));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const product = useSelector((state) => state.product.dataEdit);

  const [colorSize, setColorSize] = useState({
    color_id: null,
    color_name: null,
  });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(null);

  const handleColorClick = (color_id) => {
    const uniqueSizes = product.colorSize
      .filter((item) => item.color_id === color_id)
      .map((item) => ({
        size_id: item.size_id,
        size_name: item.size_name,
        quantity: item.quantity,
      }));
    setSizes(uniqueSizes);
    setColorSize({ size_id: uniqueSizes[0]?.size_id, color_id: color_id });
    setQuantity(uniqueSizes[0]?.quantity > 0 ? 1 : 0);
  };

  useEffect(() => {
    if (!product) return;
    const uniqueColors = product.colorSize?.reduce((acc, item) => {
      if (!acc.some((color) => color.color_id === item.color_id)) {
        acc.push({
          color_id: item.color_id,
          color_name: item.color_name,
          image: item.image,
        });
      }
      return acc;
    }, []);

    handleColorClick(product.colorSize[0]?.color_id);
    setQuantity(product.colorSize[0]?.quantity > 0 ? 1 : 0);
    setColors(uniqueColors);
    setColorSize({
      color_id: product.colorSize[0].color_id,
      size_id: product.colorSize[0].size_id,
    });
  }, [product]);

  // điều chỉnh số lượng sản phẩm
  const handleIncree = () => {
    sizes.find((s) => s.size_id === colorSize.size_id).quantity > quantity
      ? setQuantity((prev) => prev + 1)
      : message.error("Số lượng trong kho đạt giới hạn");
  };
  const handleDecree = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // thêm sản phẩm vào giỏ hàng
  const handleAddToStore = async () => {
    if (!user) {
      message.error("Vui lòng đăng nhập");
      return;
    }

    if (product.status === 0) {
      message.error("Sản phẩm đã SOLD OUT");
      return;
    }

    if (quantity === 0) {
      message.error("Sản phẩm hết hàng");
      return;
    }

    const color_size = product.colorSize.find(
      (cs) =>
        cs.color_id === colorSize.color_id && cs.size_id === colorSize.size_id
    );
    const data = {
      color_size_id: color_size.color_size_id,
      quantity: quantity,
      product_id: product.product_id,
    };
    const response = await dispatch(
      addToCart({ id: user.user_id, data: data })
    );
    if (response.payload.status === 201) {
      message.success("Thêm thành công");
      await dispatch(getCart());
    } else if (response.payload.status === 400) {
      message.error("Số lượng sản phẩm đã đạt giới hạn");
    }
  };

  return (
    <>
      <Helmet>
        <title>Chi tiết sản phẩm | TEELAB</title>
      </Helmet>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row sm:justify-between sm:flex-wrap">
          <div className="w-full lg:w-[60%] flex-grow-0 flex-shrink-0 px-[15px]">
            <Carousel autoplay arrows autoplaySpeed={3000}>
              {product?.images?.map((img, index) => (
                <div
                  key={index}
                  className="h-[600px] md:h lg:h-[700px] flex justify-center items-center"
                >
                  <img
                    className="object-cover w-full h-full"
                    src={img}
                    alt={product?.product_name}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-full lg:w-[40%] flex-grow-0 flex-shrink-0 px-[15px]">
            <h1 className="text-[22px] text-[#333] dark:text-white font-sans leading-8 mb-[10px] pb-[10px] border-b-2 border-solid border-[#000]">
              {product?.product_name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-[30px] text-[#f81f1f] font-sans ">
                {formatPrice(product?.price)}
              </span>
              <span className="text-[25px] text-[#9a9a9a] font-sans line-through">
                {formatPrice(product?.price_max)}
              </span>
              {product?.discount && (
                <span className="text-sm text-white px-2 bg-[#f81f1f] font-sans ">
                  - {product?.discount}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2 dark:text-white">
              <span>Màu sắc:</span>
              <span>
                {
                  colors.find((c) => c.color_id === colorSize.color_id)
                    ?.color_name
                }
              </span>
            </div>
            <div className="flex items-center gap-[10px] mb-[10px]">
              {colors.map((c) => (
                <div
                  key={c.color_id}
                  onClick={() => {
                    handleColorClick(c.color_id);
                  }}
                  className={`flex justify-center items-center w-8 h-8 border ${
                    c.color_id === colorSize.color_id
                      ? "border-red-600"
                      : "border-black"
                  } rounded-full cursor-pointer`}
                >
                  <img
                    src={c.image}
                    className="w-7 h-7 rounded-[100%] object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2 dark:text-white">
              <span>Kích thước:</span>
              <span>
                {sizes.find((s) => s.size_id === colorSize.size_id)?.size_name}
              </span>
            </div>
            <div className="flex items-center gap-[10px] mb-[10px]">
              {sizes.map((s) => (
                <div
                  key={s.size_id}
                  onClick={() => {
                    setColorSize({ ...colorSize, size_id: s.size_id });
                    setQuantity(s.quantity > 1 ? 1 : 0);
                  }}
                  className={`flex justify-center items-center w-8 h-8 border dark:text-white ${
                    s.size_id === colorSize.size_id
                      ? "border-red-600"
                      : "border-black dark:border-white"
                  } rounded-full cursor-pointer`}
                >
                  {s.size_name}
                </div>
              ))}
            </div>
            <Link
              to="/bang-size"
              target="blank"
              className="text-base text-[#0158da] hover:text-[#f81f1f] dark:text-white"
            >
              + Hướng dẫn chọn size
            </Link>
            <div className="my-[10px] dark:text-white">
              <span>Số lượng</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center dark:text-white">
                <button
                  type="button"
                  onClick={() => handleDecree()}
                  className="w-[30px] h-[35px] border-[1px] border-solid border-[#000] dark:border-white px-3 flex justify-center items-center rounded-s-lg"
                >
                  -
                </button>
                <span className="w-[90px] h-[35px] border-[1px] border-x-0 border-solid border-[#000] dark:border-white flex justify-center items-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleIncree()}
                  className="w-[30px] h-[35px] border-[1px] border-solid border-[#000] dark:border-white px-3 flex justify-center items-center rounded-e-lg"
                >
                  +
                </button>
              </div>
              {sizes.find((s) => s.size_id === colorSize.size_id)?.quantity >
              0 ? (
                <span className="text-black dark:text-white">Còn hàng</span>
              ) : (
                <span className="text-[#f81f1f]">
                  Hết hàng! Vui lòng chọn màu hoặc size khác
                </span>
              )}
            </div>
            <button
              type="button"
              // disabled={quantity === 0 ? true : false}
              onClick={() => handleAddToStore()}
              className="h-[47px] w-full cursor-pointer rounded-md bg-black mt-[15px] text-white dark:bg-white dark:text-black uppercase hover:opacity-80"
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[60%] px-2 md:px-0 flex flex-col md:flex-row items-center gap-3 my-8">
          <div className="flex-1 w-full h-[52px] border-1 border border-black dark:border-white rounded-md text-center cursor-pointer uppercase py-3 text-black dark:text-white">
            Mô tả sản phẩm
          </div>
          <div className="flex-1 w-full h-[52px] border-1 border border-black dark:border-white rounded-md text-center cursor-pointer uppercase py-3 text-black dark:text-white">
            Đánh giá sản phẩm
          </div>
        </div>
        <div className="py-[15px] px-2 md:px-0">
          <p className="text-[#333] dark:text-white text-sm leading-6">
            Thông tin sản phẩm
          </p>
          <p className="text-[#333] dark:text-white text-sm leading-6">
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
            <img
              src={product?.description_image}
              alt=""
              className="h-full w-[60%] my-1 border-x-[1px] border-solid border-[#b9b9b9]"
            />
            Về TEELAB:
          </p>
          <br />
          <p className="text-[#333] text-sm leading-6 dark:text-white">
            You will never be younger than you are at this very moment “Enjoy
            Your Youth!”
            <br />
            <br />
            Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi
            trẻ - nơi nghiên cứu và cho ra đời năng lượng mang tên “Youth”.
            Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và
            trẻ trung.
            <br />
            <br />
            Lấy cảm hứng từ giới trẻ, sáng tạo liên tục, bắt kịp xu hướng và
            phát triển đa dạng các dòng sản phẩm là cách mà chúng mình hoạt động
            để tạo nên phong cách sống hằng ngày của bạn. Mục tiêu của TEELAB là
            cung cấp các sản phẩm thời trang chất lượng cao với giá thành hợp
            lý.
            <br />
            Chẳng còn thời gian để loay hoay nữa đâu youngers ơi! Hãy nhanh chân
            bắt lấy những những khoảnh khắc tuyệt vời của tuổi trẻ. TEELAB đã
            sẵn sàng trải nghiệm cùng bạn!
            <br />
            <br />
            “Enjoy Your Youth”, now!
            <br />
            <br />
            Hướng dẫn sử dụng sản phẩm Teelab:
            <br />
            - Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng
            đồng hồ
            <br />
            - Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.
            <br />
            - Không dùng hóa chất tẩy.
            <br />- Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích
            hợp.
            <br />
            <br />
            Chính sách bảo hành:
            <br />
            - Miễn phí đổi hàng cho khách mua ở TEELAB trong trường hợp bị lỗi
            từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận
            chuyển hàng.
            <br />
            - Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng
            <br />- Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua
            hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân
            bên ngoài cửa hàng sau khi mua hàng.
          </p>
        </div>
      </div>
      <LastView />
    </>
  );
};

export default Detail;
