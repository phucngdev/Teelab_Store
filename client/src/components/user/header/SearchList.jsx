import React from "react";
import { useNavigate } from "react-router-dom";
import SearchEmpty from "./SearchEmpty";

const SearchList = ({ searchProducts }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[400px] absolute z-50 right-0 top-[100%] bg-white shadow-lg">
        {searchProducts.length > 0 ? (
          <>
            {searchProducts.map((p) => (
              <div
                className="hover:shadow-lg hover:bg-slate-200 bg-white p-4 flex items-center gap-3 cursor-pointer"
                key={p.product_id}
                onClick={() => navigate(`/chi-tiet/${p.product_id}`)}
              >
                <img src={p.thumbnail} alt={p.product_name} className="w-10 " />
                {p.product_name}
              </div>
            ))}
          </>
        ) : (
          <SearchEmpty />
        )}
      </div>
    </>
  );
};

export default SearchList;
