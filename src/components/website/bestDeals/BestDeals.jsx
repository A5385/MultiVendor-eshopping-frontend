import { useState, useMemo } from "react";

import styles from "../../../styles/styles";
import ProductCard from "../productCard/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    rows: 1,
    gutter: 10,
    arrows: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useMemo(() => {
    const filterData = allProducts?.filter((i) => i.sold_out !== 0);
    const sortData = filterData?.sort((a, b) => b.sold_out - a.sold_out);
    const d = sortData?.slice(0, 10);

    setData(d);
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Top Selling</h1>
        </div>
        <div className="w-full">
          <Slider {...settings}>
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </Slider>
        </div>
        <div className="w-full flex justify-end pr-3 pt-3">
          <Link
            to="/best-selling"
            className="text-red-700 border-red-500 border px-4 py-1 rounded-md hover:bg-red-500 hover:text-white hover:border-none"
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
