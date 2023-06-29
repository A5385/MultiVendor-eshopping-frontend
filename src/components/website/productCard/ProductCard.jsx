/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetailsCard from "../productDetailsCard/ProductDetailsCard";
import styles from "../../../styles/styles";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import AddToWishList from "../../items/AddToWishList";
import { backend_url } from "../../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../Products/Ratings";

const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Item already in cart ...!");
    } else {
      if (data.stock < 1) {
        toast.error(`Product stock (${data.stock}) limited !`);
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully ....!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data._id, wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <>
      <div
        className="w-full h-96 bg-white rounded lg shadow-sm p-4 relative cursor-pointer  
      "
      >
        {/* Image */}
        <Link to={`/product/${data._id}`} reloadDocument>
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt={data.title}
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* shop name */}
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name} !pb-0`}>{data.shop.name}</h5>
        </Link>

        {/* category */}
        <Link to={`/products?category=${data.category}`}>
          <h5 className={`text-red-600 pt-1`}>{data.category}</h5>
        </Link>

        {/* Product */}
        <Link to={`/product/${data._id}`}>
          <h4 className="py-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 25) + "..." : data.name}
          </h4>

          {/* rating stars */}
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          {/* price section */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}{" "}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font[400] text-[17px] text-teal-500">
              {data.sold_out} Sold
            </span>
          </div>
        </Link>
        {/* side options */}
        <div className="">
          <div className="absolute right-2 top-5">
            <AddToWishList
              size="25"
              click={click}
              onClickRemove={() => removeFromWishlistHandler(data)}
              onClickAdd={() => addToWishlistHandler(data)}
            />
          </div>

          <AiOutlineEye
            size={25}
            className="cursor-pointer text-teal-500 absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            title="Quick view"
          />

          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer text-teal-500 absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
