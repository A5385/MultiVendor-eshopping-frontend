/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/styles";
import { getAllProductsShop } from "../../redux/actions/product";

import ProductCard from "../website/productCard/ProductCard";
import Ratings from "../../components/website/Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { backend_url } from "../../server";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const [active, setActive] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex w-full items-center gap-5 justify-between ">
        {/* tabs */}
        <div className="w-full flex gap-5">
          {/* Products tab */}
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500 " : "text-[#333]"
              }cursor-pointer`}
            >
              {" "}
              Shop Products
            </h5>
            {/* {products &&
                products.map((i, index) => (
                  <ProductCard data={i} key={index} isShop={true} />
                ))} */}
          </div>

          {/* Events tab */}
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500 " : "text-[#333]"
              }cursor-pointer`}
            >
              All Events
            </h5>
          </div>
          {/* Reviews tab */}
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500 " : "text-[#333]"
              }cursor-pointer`}
            >
              Al Reviews
            </h5>
          </div>
        </div>
        {/* Go Dashboard Button */}
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} rounded-[4px] h-[42px]`}>
                  <span className="text-white ">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />
      {/* Shop Products */}
      {active === 1 &&
        (products && products.length === 0 ? (
          <h5 className="w-full text-center py-5 text-[18px]">
            No Products have for this shop!
          </h5>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2  lg:grid-cols-3  mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        ))}

      {active === 2 &&
        (events.length === 0 ? (
          <h5 className="w-full text-center py-5 text-[1.1rem]">
            No Events have for this shop
          </h5>
        ) : (
          events.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} isEvent={true} />
          ))
        ))}

      {active === 3 &&
        allReviews.map((item, index) => (
          <div className="w-full flex my-4" key={index}>
            <img
              src={`${backend_url}/${item.user.avatar}`}
              className="w-[50px] h-[50px] rounded-full"
              alt=""
            />
            <div className="pl-2">
              <div className="flex w-full items-center">
                <h1 className="font-[600] pr-2">{item.user.name}</h1>
                <Ratings rating={item.rating} />
              </div>
              <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
              <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
            </div>
          </div>
        ))}
      {allReviews && allReviews.length === 0 && (
        <h5 className="w-full text-center py-5 text-[18px]">
          No Reviews have for this shop!
        </h5>
      )}
    </div>
  );
};

export default ShopProfileData;
