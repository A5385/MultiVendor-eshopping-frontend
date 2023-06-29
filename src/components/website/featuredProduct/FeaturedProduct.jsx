import { useEffect, useMemo, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../productCard/ProductCard";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const FeaturedProduct = () => {
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
          slidesToShow: 4,
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
    const filterData = allProducts?.filter((i) => i.discountPrice > 0);
    const sortData = filterData?.sort(
      (a, b) => b.discountPrice - a.discountPrice
    );
    const d = sortData?.slice(0, 10);
    setData(d);
  }, [allProducts]);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Sale Products</h1>
      </div>
      <Slider {...settings}>
        {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
      </Slider>
    </div>
  );
};

export default FeaturedProduct;
