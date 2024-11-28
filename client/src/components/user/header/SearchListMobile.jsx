import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchListMobile = ({ searchProducts, setIsModalOpen, setSearch }) => {
  const navigate = useNavigate();

  return (
    <>
      {searchProducts.map((p) => (
        <div
          className="hover:shadow-lg hover:bg-slate-200 bg-white p-4 flex items-center gap-3 cursor-pointer"
          key={p.product_id}
          onClick={() => {
            navigate(`/chi-tiet/${p.product_id}`);
            setIsModalOpen(false);
            setSearch("");
          }}
        >
          <img src={p.thumbnail} alt={p.product_name} className="w-10 " />
          {p.product_name}
        </div>
      ))}
    </>
  );
};

export default SearchListMobile;
