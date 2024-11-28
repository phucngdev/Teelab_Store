import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategory } from "../../../services/category.service";

const ProductsNavigation = () => {
  const categorys = useSelector((state) => state.category.data);

  return (
    categorys && (
      <>
        <div className="hidden md:flex container mx-auto items-center justify-center md:h-[112px] lg:h-[56px] dark:text-white">
          <ul className="flex flex-wrap justify-center items-center h-full md:text-sm">
            <li className="">
              <Link
                to="/tat-ca-san-pham"
                className="pt-[15px] px-[15px] pb-[17px] hover:text-[#707070]"
              >
                Tất cả sản phẩm
              </Link>
            </li>
            {categorys.map((item, index) => (
              <li key={index} className="">
                <Link
                  to={item.path}
                  className="pt-[15px] px-[15px] pb-[17px] hover:text-[#707070]"
                >
                  {item.category_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  );
};

export default ProductsNavigation;
