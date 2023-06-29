/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);

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
  return (
    <div>
      <div
        className={`w-full block bg-white rounded-lg ${
          active ? "unset" : "mb-12"
        } md:flex p-2 `}
      >
        <div className="w-full lg:-w[50%] m-auto">
          <img src={`${backend_url}${data.images}`} alt="eventimage" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center">
          <h2 className={`${styles.productTitle}`}>{data.name}</h2>
          <p>{data.description}</p>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                {data.originalPrice}
              </h5>
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                {data.discountPrice}
              </h5>
            </div>
            <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
              {data.sold_out} Sold out
            </span>
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center gap-5">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div className={`${styles.button} text-[#fff]`}>See Details</div>
            </Link>

            <div
              className={`${styles.button} text-[#fff]`}
              onClick={() => addToCartHandler(data)}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
