import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import { searchProduct } from "../../../services/product.service";
import AuthButtons from "./AuthButtons";
import SearchList from "./SearchList";
import CartAndUserMenu from "./CartAndUserMenu";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLanguage } from "../../../providers/LanguageProvider";
import { useTheme } from "../../../providers/ThemeProvider";

const TopHeader = () => {
  const dispatch = useDispatch();
  const searchProducts = useSelector((state) => state.product.dataSearch);
  const user = useSelector((state) => state.user.infoUser);

  const [search, setSearch] = useState("");
  const { language, toggleLanguage } = useLanguage();

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchProduct(debouncedSearch));
    }
  }, [debouncedSearch]);

  const handleChangeLanguage = (value) => {
    toggleLanguage(value);
  };

  return (
    <>
      <div className="hidden md:block py-[5px] bg-[#f5f5f5] dark:bg-gray-950">
        <div className="container mx-auto flex gap-2 justify-end items-center">
          <form className="relative h-10 flex items-center">
            <Input
              placeholder={language.header.search.placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="dark:bg-gray-950 dark:placeholder:text-white dark:text-white"
            />
            {searchProducts && search && (
              <SearchList searchProducts={searchProducts} />
            )}
          </form>

          <Select
            defaultValue={language.language}
            style={{ width: 100 }}
            onChange={handleChangeLanguage}
            options={[
              {
                value: "en",
                label: (
                  <>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                        alt=""
                        className="w-8 h-5 object-cover"
                      />
                      EN
                    </div>
                  </>
                ),
              },
              {
                value: "vi",
                label: (
                  <>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                        alt=""
                        className="w-8 h-5 object-cover"
                      />
                      VN
                    </div>
                  </>
                ),
              },
            ]}
          />
          {user ? <CartAndUserMenu /> : <AuthButtons />}
        </div>
      </div>
    </>
  );
};

export default TopHeader;
