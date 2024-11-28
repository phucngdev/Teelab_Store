import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Skeleton } from "antd";

const Banner = () => {
  const dispatch = useDispatch();
  //   const dataBanner = useSelector((state) => state.banner.data);
  const [banner, setBanner] = useState([
    "https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_2.jpg?1710226595388",
    "https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_1.jpg?1710226595388",
    "https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/slider_4.jpg?1710226595388",
  ]);

  const loadDataBanner = async () => {};

  useEffect(() => {
    loadDataBanner();
  }, []);

  return (
    <>
      {!banner ? (
        <div className="container mx-auto mt-[50px] md:mt-0 flex justify-center">
          <Skeleton.Image active />
        </div>
      ) : (
        <div className="container mx-auto mt-[50px] md:mt-0">
          <Carousel autoplay autoplaySpeed={3000}>
            {banner?.map((bn, index) => (
              <img
                key={index}
                src={bn}
                alt={bn}
                className="w-full h-full object-cover"
              />
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default Banner;
