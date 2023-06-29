import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../../redux/actions/orders";

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <h1 className="text-center text-[20px]">
        <>
          {data && data?.status === "Processing"
            ? "Your Order is Processing in shop"
            : data?.status === "Transferred to delivery partner"
            ? "Your Order is on the way for delivery partner."
            : data?.status === "Shipping"
            ? "Your Order is coming with our delivery partner"
            : data?.status === "Received"
            ? "Your Order is in your city. You delivery man will deliver it."
            : data?.status === "On the way"
            ? "Our delivery man going to deliver your order"
            : data?.status === "Processing refund"
            ? "Your Order in refund process"
            : "Your order has been delivered"}
        </>
      </h1>
    </div>
  );
};

export default TrackOrder;
