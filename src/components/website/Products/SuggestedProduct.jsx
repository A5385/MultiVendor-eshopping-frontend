/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styles from "../../../styles/styles";

import ProductCard from "../../website/productCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [productData, setProductData] = useState();

  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category);
    setProductData(d);
  }, [allProducts, data.category]);

  return (
    <div>
      {data ? (
        <div className={`${styles.section} p-4 !mt-[50px]`}>
          <h2>
            <div
              className={`${styles.headding} text-[25px] font-[500] border-b mb-5`}
            >
              Related Product
            </div>
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4  mb-12">
            {productData &&
              productData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
