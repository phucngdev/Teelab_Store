import React from "react";
import Banner from "../../components/user/home/Banner";
import ListProducts from "../../components/user/home/ListProducts";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { sloganVN } from "../../resources/resourceVN";
import { useLanguage } from "../../providers/LanguageProvider";

const Home = () => {
  const category = useSelector((state) => state.category.data);
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Trang chủ | TEELAB</title>
      </Helmet>
      <Banner />
      <div className="container mx-auto text-center py-[30px] px-[15px] lg:py-[60px] dark:text-white">
        <div className="mb-[25px] text-[20px] lg:text-[35px]">
          Enjoy Your Youth!
        </div>
        <div className="max-w-[685px] mx-auto mb-[25px] text-sm lg:text-base">
          {language.slogan}
        </div>
      </div>
      {category ? (
        category.map((c) => (
          <ListProducts
            path={c.path}
            category={c.category_name}
            key={c.category_id}
          />
        ))
      ) : (
        <Result
          icon={<SmileOutlined />}
          title="Website đang bảo trì, xin lỗi vì sự bất tiện này"
          extra={<Button type="primary">Vui lòng quay lại sau</Button>}
        />
      )}
    </>
  );
};

export default Home;
