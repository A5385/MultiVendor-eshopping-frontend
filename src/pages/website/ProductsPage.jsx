import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "../../styles/styles";

import ProductCard from "../../components/website/productCard/ProductCard";
import Header from "../../components/website/layout/Header";
import Loader from "../../components/website/layout/Loader";
import Footer from "../../components/website/layout/Footer";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    window.scrollTo(0, 0);
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2  lg:grid-cols-4    mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {allProducts && allProducts.length === 0 ? (
              <h1 className="text-center w-full  pb-[100px] text-[20px]">
                No Products Found !
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
