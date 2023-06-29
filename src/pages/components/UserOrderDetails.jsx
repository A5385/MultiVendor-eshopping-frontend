import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/orders";
import { backend_url, server } from "../../server";
import Loader from "../../components/website/layout/Loader";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        // dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section} py-4 min-h-screen`}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center">
              <BsFillBagFill size={30} color="crimson" />
              <h1 className="pl-2 text-[25px]">Order Details</h1>
            </div>
            <Link to="/profile">
              <div
                className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
              >
                Profile
              </div>
            </Link>
          </div>
          <div className="w-full flex items-center justify-between pt-6">
            <h5 className="text-[#00000084]">
              Order ID: <span>#{data?._id?.slice(0.8)}</span>
            </h5>
            <h5 className="text-[#00000084]">
              Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
            </h5>

            {/* order items */}
          </div>
          <br />
          <br />
          {data &&
            data?.cart.map((item, index) => {
              return (
                <div className="w-full flex items-start mb-5" key={index}>
                  <img
                    src={`${backend_url}/${item.images[0]}`}
                    alt=""
                    className="w-[80x] h-[80px]"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px]">{item.name}</h5>
                    <h5 className="pl-3 text-[20px] text-[#00000091]">
                      US${item.discountPrice} x {item.qty}
                    </h5>
                  </div>
                  {/* !item.isReviewed || */}
                  {item.status !== "Delivered" && (
                    <div
                      className={`${styles.button} w-48 text-[#fff]`}
                      onClick={() => setOpen(true) || setSelectedItem(item)}
                    >
                      Write a review
                    </div>
                  )}
                </div>
              );
            })}
          {/* review popup */}
          {open && (
            <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
              <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3 ">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h2 className="text-[30px] font-[500] font-Poppins text-center">
                  Give a Review
                </h2>
                <br />
                <div className="w-full flex items-center">
                  <img
                    src={`${backend_url}/${selectedItem?.images[0]}`}
                    alt="product image"
                    className="w-[80px] h-[80px]"
                  />
                  <div>
                    <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                  </div>
                  <h4 className="pl-3 text-[20px]">
                    us$ {selectedItem?.discountPrice} x {selectedItem?.qty}
                  </h4>
                </div>
                <br />
                <br />
                {/* Ratings */}
                <h5 className="pl-3 text-[20px] font-[500]">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full ml-2 pt-1">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <br />
                <div className="w-full ml-3">
                  <label
                    htmlFor="comment"
                    className="block text-[20px] font-[500]"
                  >
                    Write a comment
                    <span className="font-[400] text-[16px] ml-2 text-[#00000052]">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="20"
                    rows="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How was your product? write your expression about it"
                    className="mt-2 w-[95%] border p-2 outline-none"
                  ></textarea>
                </div>
                <div
                  className={`${styles.button} text-white font-[20px] ml-3`}
                  onClick={rating > 1 ? reviewHandler : null}
                >
                  Submit
                </div>
              </div>
            </div>
          )}

          <div className="border-t w-full text-right">
            <h5 className="pt-3 text-[18px]">
              Total Price: <strong>US$ {data?.totalPrice}</strong>
            </h5>
          </div>
          <br />
          <br />
          <div className="w-full md:flex items-center">
            <div className="w-full md:w-[60%]">
              <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
              <h4 className="pt-3 text-[20px] ">
                {data?.shippingAddress.address1 +
                  " - " +
                  data?.shippingAddress.address2}
              </h4>
              <h4 className="text-w-[20px]">{data?.shippingAddress.country}</h4>
              <h4 className="text-w-[20px]">{data?.shippingAddress.city}</h4>
              <h4 className="text-w-[20px]">{data?.user?.phone}</h4>
            </div>
            <div className="w-full md:w-[40%]">
              <h4 className="pt-3 text-[20px]">Payment Info:</h4>
              <h4>
                Status:{" "}
                {data?.paymentInfo?.status
                  ? data?.paymentInfo?.status
                  : "Not Paid"}
              </h4>
              <br />
              {data?.status === "Delivered" && (
                <div
                  className={`${styles.button} text-white`}
                  onClick={refundHandler}
                >
                  Give a Refund
                </div>
              )}
            </div>
          </div>
          <br />
          <Link to="/">
            <div className={`${styles.button} w-[200px] text-white`}>
              Send Message
            </div>
          </Link>

          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default UserOrderDetails;
