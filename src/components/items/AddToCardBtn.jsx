import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "../../styles/styles";

const AddToCardBtn = ({ onClick }) => {
  return (
    <div className={`${styles.button} rounded  w-[200px]`} onClick={onClick}>
      <span className="text-white flex items-center">
        Add to cart <AiOutlineShoppingCart className="ml-1" />
      </span>
    </div>
  );
};

export default AddToCardBtn;
