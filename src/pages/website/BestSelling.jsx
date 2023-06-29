import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/website/layout/Header";
import Loader from "../../components/website/layout/Loader";
import ProductCard from "../../components/website/productCard/ProductCard";

import styles from "../../styles/styles";
import Footer from "../../components/website/layout/Footer";

const BestSelling = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const filterData = allProducts.filter((i) => i.sold_out !== 0);
    const sortData = filterData.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortData);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4   mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
          <br />
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSelling;
