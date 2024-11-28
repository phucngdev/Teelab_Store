import React, { useEffect, useMemo, useState } from "react";
import Editor from "../../components/admin/create_product/editor/Editor";
import { LoadingOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import { Flex, message, Upload, Button, Input, Select, Image } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../services/category.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import { createProduct } from "../../services/product.service";
import Thumbnail from "../../components/admin/create_product/Thumbnail";
import ThumbnailHover from "../../components/admin/create_product/ThumbnailHover";
import DescriptionImage from "../../components/admin/create_product/DescriptionImage";
import ListImage from "../../components/admin/create_product/ListImage";
import SelectColor from "../../components/admin/create_product/SelectColor";
import NewColor from "../../components/admin/create_product/NewColor";
import ColorSelected from "../../components/admin/create_product/ColorSelected";
import PriceAndDiscount from "../../components/admin/create_product/PriceAndDiscount";
import Category from "../../components/admin/create_product/Category";
import NewCategory from "../../components/admin/create_product/NewCategory";
import Pending from "../../components/admin/animation/Pending";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const listImageRef = ref(storage, "products/");
  const [isModalOpenNewCategory, setIsModalOpenNewCategory] = useState(false);
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState({
    // loading up ảnh
    thumbnail: false,
    thumbnail_hover: false,
    description_image: false,
    images: false,
    null: false,
  });
  const [colors, setColors] = useState([
    // color fix sẵn
    { color_name: "Đỏ", sizes: [], image: "" },
    { color_name: "Xám", sizes: [], image: "" },
    { color_name: "Trắng", sizes: [], image: "" },
    { color_name: "Đen", sizes: [], image: "" },
    { color_name: "Kem", sizes: [], image: "" },
    { color_name: "Hồng", sizes: [], image: "" },
    { color_name: "Xanh", sizes: [], image: "" },
  ]);
  const [showInput, setShowInput] = useState(false); // show input thêm mới màu
  const [imageUrls, setImageUrls] = useState([]); // mảng link ảnh images
  const [description, setDescription] = useState(""); // description
  const [colorSize, setColorSize] = useState([]); // màu và size của màu đã chọn

  const fetchData = async () => {
    await dispatch(getAllCategory());
  };

  useEffect(() => {
    fetchData();
  }, []);

  // click thêm màu mới
  const handleAddColor = () => {
    setShowInput(true);
  };

  // thêm màu mới
  const handleSaveColor = () => {};

  // huỷ thêm màu
  const handleCancel = () => {
    setShowInput(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: null,
      discount: null,
      thumbnail: "",
      thumbnail_hover: "",
      images: [],
      description_image: "",
      category: "",
      status: null,
      option: [],
      author: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên sản phẩm không được để trống"),
      category: Yup.string().required("Danh mục sản phẩm không được để trống"),
      status: Yup.string().required("Trạng thái sản phẩm không được để trống"),
      price: Yup.number().required("Giá sản phẩm không được để trống"),
      discount: Yup.number().required("Giảm giá sản phẩm không được để trống"),
      thumbnail_hover: Yup.string().required(
        "Ảnh thumbnail hover sản phẩm không được để trống"
      ),
      thumbnail: Yup.string().required(
        "Ảnh thumbnail sản phẩm không được để trống"
      ),
      description_image: Yup.string().required(
        "Ảnh mô tả sản phẩm không được để trống"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const checkImage = colorSize.find((o) => !o.image);
        if (checkImage) {
          message.warning("Vui lòng chọn ảnh cho tất cả màu");
          return;
        }
        const newProduct = {
          product_name: values.name,
          thumbnail: values.thumbnail,
          thumbnail_hover: values.thumbnail_hover,
          discount: +values.discount,
          status: values.status,
          images: imageUrls,
          description: description,
          description_image: values.description_image,
          price: +values.price,
          category: values.category,
          option: colorSize,
        };
        setPending(true);
        const response = await dispatch(createProduct(newProduct));
        if (response.payload.status === 201) {
          message.success("Tạo sản phẩm thành công");
        }
        resetForm();
        setDescription("");
        setImageUrls([]);
        setColorSize([]);
        setPending(false);
      } catch (error) {
        message.error("Lỗi");
      }
    },
  });

  //
  const handleChangeCategory = (value) => {
    formik.values.category = value;
  };
  //
  const handleChangeStatus = (value) => {
    formik.values.status = value;
    console.log(formik.values);
  };

  // chọn color cho sp
  const handleSelectColor = (color) => {
    const check = colorSize.find((c) => c.color_name === color.color_name);
    if (check) {
      message.warning("Màu đã chọn");
      return;
    }
    setColorSize([...colorSize, color]);
  };

  // xoá color đã chọn
  const handleRemoveColor = (color) => {
    setColorSize(colorSize.filter((c) => c !== color));
  };

  // click chọn size
  const handleSizeClick = (index, size) => {
    setColorSize((prevSelectedSizes) => {
      // Lấy danh sách kích thước hiện tại của màu đang chọn
      const currentSizes = prevSelectedSizes[index].sizes || [];

      // Kiểm tra xem kích thước đã có trong danh sách hay chưa
      const sizeExists = currentSizes.some((item) => item.size === size);

      // Tạo bản sao của mảng prevSelectedSizes để tránh thay đổi trực tiếp state cũ
      const updatedSelectedSizes = [...prevSelectedSizes];

      if (sizeExists) {
        // Nếu kích thước đã có trong danh sách, thì xoá nó
        updatedSelectedSizes[index] = {
          ...updatedSelectedSizes[index],
          sizes: currentSizes.filter((s) => s.size !== size),
        };
      } else {
        // Nếu kích thước chưa có trong danh sách, thì thêm vào
        updatedSelectedSizes[index] = {
          ...updatedSelectedSizes[index],
          sizes: [
            ...currentSizes,
            {
              size,
              quantity: 0,
            },
          ],
        };
      }

      return updatedSelectedSizes;
    });
  };

  // nhập số lượng của size
  const handleQuantityChange = (index, size, quantity) => {
    setColorSize((prevSelectedSizes) => {
      const updatedSelectedSizes = [...prevSelectedSizes];
      updatedSelectedSizes[index] = {
        ...updatedSelectedSizes[index],
        sizes: updatedSelectedSizes[index].sizes.map((s) =>
          s.size === size ? { ...s, quantity } : s
        ),
      };
      return updatedSelectedSizes;
    });
  };

  const handleCustomRequest = async ({
    file,
    onSuccess,
    onError,
    fieldName,
    colorLabel,
  }) => {
    try {
      setLoading({
        ...loading,
        [fieldName]: true,
      });

      const imageRef = ref(listImageRef, file.name);
      await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      onSuccess({ url: downloadUrl });

      if (colorLabel) {
        setColorSize((prevVariants) =>
          prevVariants.map((variant) =>
            variant.color_name === colorLabel
              ? { ...variant, image: downloadUrl }
              : variant
          )
        );
      } else {
        formik.setFieldValue(fieldName, downloadUrl);
        // formik.setFieldValue(fieldName, [
        //   ...formik.values[fieldName],
        //   downloadUrl,
        // ]);
      }
      setLoading({
        ...loading,
        [fieldName]: false,
      });
    } catch (error) {
      onError(error);
      setLoading({
        ...loading,
        [fieldName]: false,
      });
    }
  };

  const getUploadProps = (fieldName, colorLabel) => ({
    name: fieldName,
    onChange: (info) => {
      if (info.file.status === "done") {
        const downloadUrl = info.file.response.url;
        if (colorLabel) {
          setColorSize((prevVariants) =>
            prevVariants.map((variant) =>
              variant.color === colorLabel
                ? { ...variant, image: downloadUrl }
                : variant
            )
          );
        } else {
          info.fileList.length === 1
            ? formik.setFieldValue(fieldName, downloadUrl)
            : setImageUrls((prevImageUrls) => [...prevImageUrls, downloadUrl]);
        }
        message.success("Tải ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải ảnh thất bại");
      }
    },
    customRequest: (options) =>
      handleCustomRequest({ ...options, fieldName, colorLabel }),
  });

  const showModal = () => {
    setIsModalOpenNewCategory(true);
  };

  if (pending) return <Pending />;

  return (
    <>
      <NewCategory
        isModalOpenNewCategory={isModalOpenNewCategory}
        setIsModalOpenNewCategory={setIsModalOpenNewCategory}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold">
            <ShopOutlined /> Thêm mới sản phẩm
          </h3>
          <Button type="primary" htmlType="submit">
            Lưu sản phẩm
          </Button>
        </div>
        <div className="flex gap-6">
          <div className="rounded-[20px] w-1/3">
            <Thumbnail
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <ThumbnailHover
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <DescriptionImage
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <ListImage
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
              imageUrls={imageUrls}
            />
          </div>
          <div className="rounded-[20px] flex-1">
            <div className="border border-gray-200 p-4 rounded-[20px]">
              <h3 className="text-xl font-normal mb-8">Tổng quan</h3>
              <h5 className="text-base font-normal mb-2">Tên sản phẩm</h5>
              <Input
                placeholder="nhập tên sản phẩm"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
              <h5 className="text-base font-normal mb-2 mt-5">
                Chi tiết sản phẩm sản phẩm
              </h5>
              <Editor
                setDescription={setDescription}
                description={description}
              />
              {/* {formik.touched.description && formik.errors.description ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              ) : null} */}
              <SelectColor
                colors={colors}
                handleSelectColor={handleSelectColor}
                handleAddColor={handleAddColor}
              />
              <NewColor
                showInput={showInput}
                handleSaveColor={handleSaveColor}
                handleCancel={handleCancel}
              />
              <ColorSelected
                colorSize={colorSize}
                handleRemoveColor={handleRemoveColor}
                getUploadProps={getUploadProps}
                handleSizeClick={handleSizeClick}
                handleQuantityChange={handleQuantityChange}
                loading={loading}
              />
            </div>
            <PriceAndDiscount
              formik={formik}
              handleChangeStatus={handleChangeStatus}
            />
            <Category
              formik={formik}
              handleChangeCategory={handleChangeCategory}
              showModal={showModal}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
