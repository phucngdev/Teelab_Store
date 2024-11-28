import React, { useEffect, useMemo, useState } from "react";
import Editor from "../../components/admin/create_product/editor/Editor";
import { LoadingOutlined, PlusOutlined, ShopOutlined } from "@ant-design/icons";
import { message, Button, Input, Upload, Image } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../services/category.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import {
  getOneProduct,
  getOneProductForUpdate,
  updateProduct,
} from "../../services/product.service";
import { useParams } from "react-router-dom";
import ListImage from "../../components/admin/create_product/ListImage";
import DescriptionImage from "../../components/admin/create_product/DescriptionImage";
import ThumbnailHover from "../../components/admin/create_product/ThumbnailHover";
import Thumbnail from "../../components/admin/create_product/Thumbnail";
import Category from "../../components/admin/create_product/Category";
import PriceAndDiscount from "../../components/admin/create_product/PriceAndDiscount";
import NewCategory from "../../components/admin/create_product/NewCategory";
import SelectColor from "../../components/admin/create_product/SelectColor";
import NewColor from "../../components/admin/create_product/NewColor";
import Pending from "../../components/admin/animation/Pending";
import Header from "../../components/admin/edit_product/update/Header";
import Images from "../../components/admin/edit_product/update/Images";
import Center from "../../components/admin/edit_product/update/Center";
import Price from "../../components/admin/edit_product/update/Price";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    try {
      setPending(true);
      await Promise.allSettled([
        dispatch(getAllCategory()),
        dispatch(getOneProductForUpdate(id)),
      ]);
    } catch (error) {
      message.error(error.message);
    } finally {
      setPending(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const product = useSelector((state) => state.product.dataEdit);

  if (pending) return <Pending />;

  return (
    <>
      <Header product_name={product?.product_name} />
      <div className="flex gap-4">
        <Images product={product} />
        <Center product={product} />
        <Price product={product} />
      </div>
    </>
  );
};

export default EditProduct;
