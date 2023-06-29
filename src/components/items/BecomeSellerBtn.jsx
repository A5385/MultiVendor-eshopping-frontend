import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const BecomeSellerBtn = () => {
  const { isSeller } = useSelector((state) => state.seller);
  return (
    <div className={`${styles.button} rounded-md`}>
      {isSeller ? (
        <Link className="text-[#fff] flex items-center" to="/dashboard">
          Dashboard <IoIosArrowForward className="ml-1" />
        </Link>
      ) : (
        <Link className="text-[#fff] flex items-center" to="/create-shop">
          Become/Login Seller <IoIosArrowForward className="ml-1" />
        </Link>
      )}
    </div>
  );
};

export default BecomeSellerBtn;
