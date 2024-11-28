import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneProductImport } from "../../services/product.service";
import Header from "../../components/admin/edit_product/import/Header";
import Option from "../../components/admin/edit_product/import/Option";
import Pending from "../../components/admin/animation/Pending";

const ImportProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);
  const [modalSaveOpen, setModalSaveOpen] = useState(false);
  const [modalNewOpen, setModalNewOpen] = useState(false);

  const fetchData = async () => {
    setPending(true);
    await dispatch(getOneProductImport(id));
    setPending(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const product = useSelector((state) => state.product.dataEdit);

  if (pending) return <Pending />;

  return (
    <>
      <Header
        product_name={product?.product_name}
        setModalSaveOpen={setModalSaveOpen}
        setModalNewOpen={setModalNewOpen}
      />
      <Option
        product_id={product?.product_id}
        status={product?.status}
        options={product?.options}
        modalSaveOpen={modalSaveOpen}
        setModalSaveOpen={setModalSaveOpen}
        setModalNewOpen={setModalNewOpen}
        modalNewOpen={modalNewOpen}
      />
    </>
  );
};

export default ImportProduct;
