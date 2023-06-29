import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../components/website/layout/Header";
import Footer from "../../components/website/layout/Footer";
import SuggestedProduct from "../../components/website/Products/SuggestedProduct";
import ProductDetails from "../../components/website/Products/ProductDetails";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [allEvents, allProducts, eventData, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />

      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
